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
  public pregunta;
  public respuestaBbdd;
  public respuesta: string;
  public password: string;

  constructor(
    private activeroute: ActivatedRoute,
    private router: Router,
    private alertController: AlertController,
    private auth: AuthenticationService,
    private storage: StorageService,
  ){
    this.usuario = new Usuario;
  }

  ngOnInit() {
    this.getPregunta();
    this.getRespuesta();
  }

  validarRespuesta(){
    if (this.respuestaBbdd === this.respuesta){
      //hacer redirect a correcto
      this.router.navigate(['/correcto']);
    }else{
      this.router.navigate(['/incorrecto']);
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
    this.storage.clear();
    this.router.navigate(['/login']);
  }

  getPregunta() {
    this.storage.getItem('USER_DATA').then( resultado => {
      console.log(eval(resultado.value)[0].preguntaSecreta);
      this.pregunta = eval(resultado.value)[0].preguntaSecreta;
    });
    
  }

  getRespuesta() {
    this.storage.getItem('USER_DATA').then( resultado => {
      console.log(eval(resultado.value)[0].respuesta);
      this.respuestaBbdd = eval(resultado.value)[0].respuesta;
    });
    
  }




}
