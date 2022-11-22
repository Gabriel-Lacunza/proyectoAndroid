import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DBSQLiteValues } from '@capacitor-community/sqlite';
import { ViewWillEnter } from '@ionic/angular';
import { log, showAlertError, showAlertYesNoDUOC } from 'src/app/model/Mensajes';
import { MessageEnum } from 'src/app/model/MessageEnum';
import { Usuario } from 'src/app/model/Usuario';
import { DatabaseService } from 'src/app/services/database.service';

@Component({
  selector: 'app-delete-user',
  templateUrl: './delete-user.page.html',
  styleUrls: ['./delete-user.page.scss'],
})
export class DeleteUserPage implements ViewWillEnter {

  usuarios = new Array<Usuario>;
  cantidad = 0;

  constructor(private router: Router, private db: DatabaseService) {
  }

  ionViewWillEnter(): void {
    this.getUsuarios();
  }

  getUserId(index, item) {
    return item.correo;
  }

   async getUsuarios() {
    try {
      const rs: DBSQLiteValues = await this.db.readUsers();
      log('DeleteUserPage.getUsuarios', `Cantidad de usuarios: ${rs.values.length}`);
      this.cantidad = rs.values.length;
      this.usuarios = new Array<Usuario>();
      rs.values.forEach((value, index) => {
        let usu: Usuario = new Usuario();
        usu.setUser(
          value.correo,
          value.password,
          value.nombreUsuario,
          value.preguntaSecreta,
          value.respuesta,
          '',
          false);
        this.usuarios.push(usu);
      });
    } catch(err) {
      showAlertError('DeleteUserPage.getUsuarios', err);
    }
  }

  async eliminarUsuario($event){
    const correo = $event.correo;
    const usuToDelete: Usuario = this.usuarios.find((usu) => usu.correo === correo);
    const resp = await showAlertYesNoDUOC(`¿Está seguro que desea eliminar el usuario ${usuToDelete.nombreUsuario}?`);
    if (resp === MessageEnum.YES) {
      await this.db.deleteUser(correo);
      this.getUsuarios()
    }
  }

  volver() {
    this.router.navigate(['login']);
  }

}
