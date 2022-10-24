import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router, NavigationExtras, Data } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';
//import { buscarUsuario, Usuario } from 'src/app/model/Usuario';
import {  Usuario } from 'src/app/model/Usuario';
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

  constructor(private router: Router, 
    private auth: AuthenticationService, 
    private toastController: ToastController,
     private alertController: AlertController,
     private readonly db: DatabaseService,
     private readonly storage: StorageService) {
    this.usuario = new Usuario();
    this.usuario.correo = '';
  }

  public ngOnInit(): void {
    this.usuario.correo = 'atorres@duocuc.cl';
    this.usuario.password = '1234';

    // this.siguiente();

  }

  buscarUsuario() {
    // console.log(this.usuario.correo);
    this.db.buscarCorreo(this.usuario.correo).then((res) => {
      if(res.length > 0) {
        // console.log(res);
          console.log('correo wueno'); //poner alerta
          this.storage.setItem('USER_DATA', JSON.stringify(res));
          this.router.navigate(['rs']);
      }else {
        console.log('ta malo el correo '); //poner alerta
      }
    });

  }

  iniciarSesion() {
    this.auth.logout();
  }
}
