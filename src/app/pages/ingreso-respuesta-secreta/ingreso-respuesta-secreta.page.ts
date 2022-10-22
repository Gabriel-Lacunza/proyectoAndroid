import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Usuario } from 'src/app/model/Usuario';

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
    private alertController: AlertController
  ){
    this.usuario = new Usuario;
    this.usuario.respuesta = "";
    
    this.activeroute.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state){
        this.user = this.router.getCurrentNavigation().extras.state.user;
      }else{
        this.router.navigate(["/rs"]);
      }
    });
  }

  ngOnInit() {
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
    const navigationExtras: NavigationExtras = {
        };
    this.router.navigate(['/login'], navigationExtras);
  }
}
