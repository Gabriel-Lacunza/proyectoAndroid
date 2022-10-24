import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Usuario } from 'src/app/model/Usuario';

import { AuthenticationService } from 'src/app/services/authentication.service';
import { StorageService } from '../../services/storage.service';

@Component({
  selector: 'app-ingreso-respuesta-secreta',
  templateUrl: './ingreso-respuesta-secreta.page.html',
  styleUrls: ['./ingreso-respuesta-secreta.page.scss'],
})
export class IngresoRespuestaSecretaPage implements OnInit {
  public usuario: Usuario;
  public user: Usuario;

  constructor(
    private activeroute: ActivatedRoute,
    private router: Router,
    private alertController: AlertController,
    private auth: AuthenticationService,
    private storage: StorageService,
  ){
    this.usuario = new Usuario;
    /*
    this.activeroute.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state){
        this.user = this.router.getCurrentNavigation().extras.state.user;
      }else{
        this.router.navigate(["/rs"]);
      }
    });*/
  }

  ngOnInit() {
    this.storage.getItem('USER_DATA').then( res => {
      const usuario = console.log(JSON.stringify(res)); //:-)
      console.log(res[0].correo);
      console.log('Correo usuario = '+ usuario[0].correo);
    })
  }

  mostrar(){
    if (this.usuario.respuesta === this.user.respuesta){
      //hacer redirect a correcto
      const navigationExtras: NavigationExtras = {
        state: {
          user: this.user
        }
      };
      this.router.navigate(['/correcto'], navigationExtras);
    }else{
      const navigationExtras: NavigationExtras = {
        state: {}
      };
      this.router.navigate(['/incorrecto'], navigationExtras);
    }
  }

  public async presentAlert(titulo: string, mensaje: string){
    const alert = await this.alertController.create({
      header: titulo,
      message: mensaje,
      buttons: ["ok"]
    });

    await alert.present();
  }

  iniciarSesion() {
    this.router.navigate(['/login']);
  }

  getCorreo() {
    console.log('holaa');
    this.storage.getItem('USER_DATA').then( resultado => {

      console.log(eval(resultado.value)[0].correo);//correo limpio para validar

    
    });
    
  }

}
