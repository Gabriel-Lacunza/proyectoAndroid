import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { Alert } from 'selenium-webdriver';
import { Usuario } from 'src/app/model/Usuario';
 
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
 
  public usuario: Usuario;
  
  constructor(private router: Router, private toastController: ToastController) {
    this.usuario = new Usuario();
    this.usuario.nombreUsuario = '';
    this.usuario.password = '';
  }
 
  public ngOnInit(): void {
 
    // this.usuario.nombreUsuario = 'be.duran@duocuc.cl';
    // this.usuario.password = '0205';
    // this.ingresar();
  }
 

  public ingresar(): void {
 
    if(!this.validarUsuario(this.usuario)) {
      
      return;
    }
    if ("atorres@duocuc.cl avalenzuela@duocuc.cl cfuentes@duocuc.cl".includes(this.usuario.nombreUsuario)){
      if("atorres@duocuc.cl1234" === this.usuario.nombreUsuario+this.usuario.password
          ||"avalenzuela@duocuc.clqwer" === this.usuario.nombreUsuario+this.usuario.password
          ||"cfuentes@duocuc.clasdf"  === this.usuario.nombreUsuario+this.usuario.password) {
          console.log('Inicio de sesión correcto')
      }else {
        console.log('No inicia sesión')
        this.mostrarMensaje('La contraseña no coincide con el e-mail registrado.')
        return;
      }
    }else{
      console.log('El correo no existe')
      this.mostrarMensaje('El email ingresado no está registrado.')
      return;
    }
 
    this.mostrarMensaje('¡Bienvenido!');
 
    const navigationExtras: NavigationExtras = {
      state: {
        usuario: this.usuario
      }
    };
    this.router.navigate(['/home'], navigationExtras);
  }
 
  public validarUsuario(usuario: Usuario): boolean {
 
    const mensajeError = usuario.validarUsuario();
 
    if (mensajeError) {
      this.mostrarMensaje(mensajeError);
      return false;
    }
 
    return true;
  }
 
  /**
   * 
   *
   * @param mensaje 
   * @param duracion 
   */
  async mostrarMensaje(mensaje: string, duracion?: number) {
    const toast = await this.toastController.create({
        message: mensaje,
        duration: duracion? duracion: 2000
      });
    toast.present();
  }
 
}
