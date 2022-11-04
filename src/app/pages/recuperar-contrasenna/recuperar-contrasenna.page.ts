import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router, NavigationExtras, Data } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';
//import { buscarUsuario, Usuario } from 'src/app/model/Usuario';
import {  Usuario } from 'src/app/model/usuario';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { DatabaseService } from 'src/app/services/database.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-recuperar-contrasenna',
  templateUrl: './recuperar-contrasenna.page.html',
  styleUrls: ['./recuperar-contrasenna.page.scss'],
})
export class RecuperarContrasennaPage implements OnInit {
  public usuario: Usuario;
  public correo;

  constructor(private router: Router, 
    private auth: AuthenticationService, 
    private readonly db: DatabaseService,
    private readonly storage: StorageService) {
  }

  public ngOnInit(): void {
    // this.siguiente();

  }

  buscarUsuario() {
    // console.log(this.usuario.correo);
    this.db.buscarCorreo(this.correo).then((res) => {
      if(res.length > 0) {
          this.storage.setItem('USER_DATA', JSON.stringify(res));
          this.router.navigate(['rs']);
      }else {
        return;
      }
    });

  }

  iniciarSesion() {
    this.auth.logout();
  }
}
