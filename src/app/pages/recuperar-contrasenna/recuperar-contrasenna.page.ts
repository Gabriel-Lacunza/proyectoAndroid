import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';
//import { buscarUsuario, Usuario } from 'src/app/model/Usuario';
import {  Usuario } from 'src/app/model/Usuario';

@Component({
  selector: 'app-recuperar-contrasenna',
  templateUrl: './recuperar-contrasenna.page.html',
  styleUrls: ['./recuperar-contrasenna.page.scss'],
})
export class RecuperarContrasennaPage implements OnInit {
  public usuario: Usuario;

  constructor(private router: Router, private toastController: ToastController, private alertController: AlertController) {
    this.usuario = new Usuario();
    this.usuario.nombreUsuario = '';
  }

  public ngOnInit(): void {
    this.usuario.nombreUsuario = 'atorres@duocuc.cl';
    this.usuario.password = '1234';

    // this.siguiente();

  }
  /*
  siguiente() {
    const users = buscarUsuario(this.usuario.nombreUsuario);
      if (this.usuario.nombreUsuario === users.nombreUsuario){
        const navigationExtras: NavigationExtras = {
          state: {
            user: users
          }
        };
        this.router.navigate(['/rs'], navigationExtras);
      }
  }*/

  iniciarSesion() {
    const navigationExtras: NavigationExtras = {
        };
    this.router.navigate(['/login'], navigationExtras);
  }
}
