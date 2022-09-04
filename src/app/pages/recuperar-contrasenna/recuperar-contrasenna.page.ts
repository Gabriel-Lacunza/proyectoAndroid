import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';
import { Usuario } from 'src/app/model/Usuario';

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
    this.usuario.respuesta = "";
  }

  ngOnInit() {
  }

  siguiente() {

    const usuariosSistema = [
      {username: "atorres@duocuc.cl", password: "1234", nombre: "Ana Torres Lelva", fraseSecreta: "nombre de tu mascota", respuestaSecreta: "gato"},
      {username: "avalenzuela@duocuc.cl", password: "qwer", nombre: "Alberto Valenzuela Nuñez", fraseSecreta: "nombre de tu mejor amigo", respuestaSecreta: "juanito"},
      {username: "cfuentes@duocuc.cl", password: "asdf", nombre: "Carla Fuentes Gonzales", fraseSecreta: "lugar de nacimiento de tu madre", respuestaSecreta: "valparaiso"}
    ]
    const users = usuariosSistema.find(user => user.username === this.usuario.nombreUsuario);
    let user = false;
    this.usuario.fraseSecreta = users.fraseSecreta;
    let respuesta = false;

    if (users){
      user = true;
    }

    if (this.usuario.respuesta === users.respuestaSecreta){
      respuesta = true;
    }

    if (user === true && respuesta === true){
      this.presentAlert("contraseña", users.password)
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
}
