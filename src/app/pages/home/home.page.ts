import { Component, ElementRef, OnInit, ViewChild,AfterViewInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Usuario } from 'src/app/model/Usuario';
import { nivelEducacional } from '../../model/nivelEducacional';
import { persona } from '../../model/persona';
import { AnimationController } from '@ionic/angular';
import { LoadingController } from '@ionic/angular';
import jsQR, { QRCode } from 'jsqr';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})

export class HomePage implements OnInit {

  @ViewChild("icon", { read: ElementRef, static: true}) icon: ElementRef;
  @ViewChild('titulo', { read: ElementRef, static: true}) titulo: ElementRef;
  @ViewChild('video', { static: false })
  private video: ElementRef;

  @ViewChild('canvas', { static: false })
  private canvas: ElementRef;

  @ViewChild('fileinput', { static: false })
  private fileinput: ElementRef;

  public escaneando = false;
  public datosQR = '';
  public loading: HTMLIonLoadingElement = null;

  public usuario: Usuario;
  public nivelEducacion: nivelEducacional[] = new nivelEducacional().getNivelEducacional();
  public persona: persona = new persona();

  constructor(
    private activeroute: ActivatedRoute,
    private router: Router,
    private alertController: AlertController,
    private animationController: AnimationController,
    private loadingController: LoadingController
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

  //   const animation1 = this.animationController
  //   .create()
  //   .addElement(this.titulo.nativeElement)
  //   .iterations(Infinity)
  //   .duration(5000)
  //   .fromTo('transform', 'translate(0%)', 'translate(100%)')
  //   .fromTo('opacity', 1, 1);
  //   animation1.play();
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

  public limpiarDatos(): void {
    this.escaneando = false;
    this.datosQR = '';
    this.loading = null;
    (document.getElementById('input-file') as HTMLInputElement).value = '';
  }

  public async comenzarEscaneoQR() {
    this.limpiarDatos();
    const mediaProvider: MediaProvider = await navigator.mediaDevices.getUserMedia({
      video: {facingMode: 'environment'}
    });
    this.video.nativeElement.srcObject = mediaProvider;
    this.video.nativeElement.setAttribute('playsinline', 'true');
    this.loading = await this.loadingController.create({});
    await this.loading.present();
    this.video.nativeElement.play();
    requestAnimationFrame(this.verificarVideo.bind(this));
  }

  public obtenerDatosQR(source?: CanvasImageSource): boolean {
    let w = 0;
    let h = 0;
    if (!source) {
      this.canvas.nativeElement.width = this.video.nativeElement.videoWidth;
      this.canvas.nativeElement.height = this.video.nativeElement.videoHeight;
    }

    w = this.canvas.nativeElement.width;
    h = this.canvas.nativeElement.height;
    console.log(w + ' ' + h);

    const context: CanvasRenderingContext2D = this.canvas.nativeElement.getContext('2d');
    context.drawImage(source? source : this.video.nativeElement, 0, 0, w, h);
    const img: ImageData = context.getImageData(0, 0, w, h);
    const qrCode: QRCode = jsQR(img.data, img.width, img.height, { inversionAttempts: 'dontInvert' });

    if (qrCode) {
      this.escaneando = false;
      this.datosQR = qrCode.data;
      // console.log(this.datosQR); ENTRA
    }
    return this.datosQR !== '';
  }

  async verificarVideo() {
    if (this.video.nativeElement.readyState === this.video.nativeElement.HAVE_ENOUGH_DATA) {
      if (this.loading) {
        await this.loading.dismiss();
        this.loading = null;
        this.escaneando = true;
      }
      if (this.obtenerDatosQR()) {
        console.log(1);
        const navigationExtras: NavigationExtras = {
          state: {
            datosQR: this.datosQR
          }
        }
        this.router.navigate(['/miclase'],navigationExtras);
      } else {
        if (this.escaneando) {
          console.log(2);
          requestAnimationFrame(this.verificarVideo.bind(this));
        }
      }
    } else {
      console.log(3);
      requestAnimationFrame(this.verificarVideo.bind(this));
    }
  }

  public detenerEscaneoQR(): void {
    this.escaneando = false;
  }

  public cargarImagenDesdeArchivo(): void {
    this.limpiarDatos();
    this.fileinput.nativeElement.click();
  }

  public verificarArchivoConQR(files: FileList): void {
    const file = files.item(0);
    const img = new Image();
    img.onload = () => {
      this.obtenerDatosQR(img);
      //console.log(this.datosQR);
      const navigationExtras: NavigationExtras = {
        state: {
          datosQR: this.datosQR
        }
      }
      this.router.navigate(['/miclase'],navigationExtras);
    };
    img.src = URL.createObjectURL(file);
  }

  cerrarSesion() {
    const navigationExtras: NavigationExtras = {
        };
    this.router.navigate(['/login'], navigationExtras);
  }
}


