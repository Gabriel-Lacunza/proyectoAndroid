import { Component, ElementRef, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Usuario } from 'src/app/model/Usuario';
import { nivelEducacional } from '../../model/nivelEducacional';
import { persona } from '../../model/persona';
import { AnimationController } from '@ionic/angular';
import { LoadingController } from '@ionic/angular';
import jsQR, { QRCode } from 'jsqr';

import { BarcodeScanner, SupportedFormat } from '@capacitor-community/barcode-scanner';

import { AuthenticationService } from 'src/app/services/authentication.service';
import { StorageService } from 'src/app/services/storage.service';
import { DatabaseService } from 'src/app/services/database.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.scss'],
})
export class InicioComponent implements OnInit {

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
  public nombre;

  handlerPermissions: any;
  initPlugin: boolean = false;

  constructor(
    private activeroute: ActivatedRoute,
    private router: Router,
    private alertController: AlertController,
    private animationController: AnimationController,
    private loadingController: LoadingController,
    private auth: AuthenticationService,
    private storage: StorageService,
    private readonly db: DatabaseService
  ) {  }

  async ngOnInit(): Promise<void> {
    console.log("hola mundo");
    console.log('ESTOY EN HOME PAGE ', await this.storage.getItem('USER_DATA'));
    this.getNombre();
  }

  public ngAfterViewInit(): void {
    const animation = this.animationController
      .create()
      .addElement(this.icon.nativeElement)
      .iterations(Infinity)
      .duration(5000)
      .fromTo("transform", "rotate(0)", "rotate(380deg)");
    
    animation.play();
  }


  public limpiarFormulario(): void {
    for (const [key, value] of Object.entries(this.persona)){
      Object.defineProperty(this.persona, key, {value: ""});
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

  salir() {
    this.auth.logout();
    this.storage.clear();
  }

  //---------------------------DATOS USUARIO--------------------------------

  getNombre() {
    this.storage.getItem('USER_DATA').then( resultado => {
      this.nombre = JSON.parse(resultado.value).nombreUsuario;
    });
  }

  //-------------------------CAMARA NATIVA-------------------------

  
async checkPermission() {
  return new Promise(async (resolve) => {
    const status = await BarcodeScanner.checkPermission({ force: true });
    if (status.granted) {
      resolve(true);
    } else if (status.denied) {
      BarcodeScanner.openAppSettings();
      resolve(false);
    }
  });
}

async comenzarEscaneo() {
  const allowed = await this.checkPermission();
  if (allowed) {
    this.escaneando = true;
    BarcodeScanner.hideBackground();
    const result = await BarcodeScanner.startScan({ targetedFormats: [SupportedFormat.QR_CODE] });
    if (result.hasContent) {
      this.escaneando = false;
      alert(result.content);
    } 
    else {
      alert('No fue posible encontrar datos de código QR');
    }
  } 
  else {
    alert('No fue posible escanear, verifique que la aplicación tenga permiso para la cámara');
  }
}

detenerEscaneo() {
  BarcodeScanner.stopScan();
  this.escaneando = false;
}

ionViewWillLeave() {
  this.detenerEscaneo();
}

}
