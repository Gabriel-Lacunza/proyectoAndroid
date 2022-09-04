import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Usuario } from 'src/app/model/Usuario';
import { nivelEducacional } from '../../model/nivelEducacional';
import { persona } from '../../model/persona';
import { AnimationController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})

export class HomePage implements OnInit {

  @ViewChild("icon", { read: ElementRef, static: true}) icon: ElementRef;
  @ViewChild('titulo', { read: ElementRef, static: true}) titulo: ElementRef;

  public usuario: Usuario;
  public nivelEducacion: nivelEducacional[] = new nivelEducacional().getNivelEducacional();
  public persona: persona = new persona();

  constructor(
    private activeroute: ActivatedRoute,
    private router: Router,
    private alertController: AlertController,
    private animationController: AnimationController
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

  public ngAfterViewInit(): void {
    const animation = this.animationController
      .create()
      .addElement(this.icon.nativeElement)
      .iterations(Infinity)
      .duration(5000)
      .fromTo("transform", "rotate(0)", "rotate(380deg)");
    
    animation.play();

    const animation1 = this.animationController
    .create()
    .addElement(this.titulo.nativeElement)
    .iterations(Infinity)
    .duration(5000)
    .fromTo('transform', 'translate(0%)', 'translate(100%)')
    .fromTo('opacity', 1, 1);
    animation1.play();
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
