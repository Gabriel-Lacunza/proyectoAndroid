import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { Alert } from 'selenium-webdriver';
//import { Usuario, buscarUsuario } from 'src/app/model/Usuario';
//import { Mensajes } from 'src/app/model/Mensajes';
import { Usuario } from 'src/app/model/usuario';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { DatabaseService } from 'src/app/services/database.service';

import { log, mostrarEjemplosDeMensajes, showAlertDUOC, showAlertYesNoDUOC, showToast } from 'src/app/model/Mensajes';
//import { AuthService } from 'src/app/services/authentication.service';
import { capSQLiteChanges } from '@capacitor-community/sqlite';
 
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
 
  public usuario: Usuario;
  correo: string = '';
  password: string = '';
  darkMode: boolean = false;

 constructor(private router: Router, private auth: AuthenticationService, private toastController: ToastController, private databaseService: DatabaseService) {
  this.correo;
  this.password;
  const prefersDark = window.matchMedia('prefers-color-scheme: dark');
  this.darkMode = prefersDark.matches;
  
  }

  ngOnInit() {}

  intercambiarModoOscuro(event) {
    if (event.detail.checked) {
      document.body.setAttribute('color-theme', 'dark');
    } else {
      document.body.setAttribute('color-theme', 'light');
    }
  }

  async ingresar() {
    this.auth.login(this.correo, this.password);
  }
 //--------------------------------------------------------------------------------------------
  async mostrarMensaje(mensaje: string, duracion?: number) {
    const toast = await this.toastController.create({
        message: mensaje,
        duration: duracion? duracion: 2000
      });
    toast.present();
  }

  public recuperar(): void {
    this.router.navigate(['recuperar']);
  }

  async eliminar() {
    log('LoginPage.eliminar', 'Navegar a página aliminar usuarios');
    this.router.navigate(['delete-user']);
  }

  registrar() {
    log('LoginPage.registrar', 'Navegar a página crear nuevo usuario');
    this.router.navigate(['create-user']);
  }
 
}
