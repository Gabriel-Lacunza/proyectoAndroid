import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { usuario } from 'src/app/model/usuario';
import { nivelEducacional } from '../../model/nivelEducacional';
import { persona } from '../../model/persona';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})

export class HomePage implements OnInit {
  public usuario: usuario;
  public nivelEducacion: nivelEducacional[] = new nivelEducacional().getNivelEducacional();
  public persona: persona = new persona();

  constructor(
    private activeroute: ActivatedRoute,
    private router: Router,
    private alertController: AlertController
  ) { 
    this.activeroute.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state){
        this.usuario = this.router.getCurrentNavigation().extras.state.usuario;
      }/*else{
        this.router.navigate(["/login"]);
      }*/
    });
  }

  ngOnInit() {
  }

  public limpiarFormulario(): void {
    for (const [key, value] of Object.entries(this.persona)){
      Object.defineProperty(this.persona, key, {value: ""});
    }
  }

  public mostrarDatosPersona(): void {
    if (this.persona.nombre.trim() === "" && this.persona.apellido === ""){
      this.presentAlert("datos personales", "para mostrar los datos de la persona, " + "al menos debe tener un valor para el nombre o el apellido");
      return;
    }

    let mensaje = "<br>usuario: " + this.usuario.nombreUsuario;
    mensaje += "<br>nombre: " + this.persona.nombre;
    mensaje += "<br>apellido: " + this.persona.apellido;
    mensaje += "<br>educacion: " + this.persona.getNivelEducacional();
    mensaje += "<br>fecha de nacimiento: " + this.persona.getFechaNacimiento();

    this.presentAlert("datos personales", mensaje);
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
