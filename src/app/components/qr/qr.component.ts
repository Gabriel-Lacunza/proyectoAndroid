import { Component, OnInit, ViewChild, ElementRef} from '@angular/core';
import { BarcodeScanner, SupportedFormat } from '@capacitor-community/barcode-scanner';
import jsQR, { QRCode } from 'jsqr';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { StorageService } from 'src/app/services/storage.service';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-qr',
  templateUrl: './qr.component.html',
  styleUrls: ['./qr.component.scss'],
})
export class QrComponent implements OnInit {
  @ViewChild('video', { static: false })
  private video: ElementRef;

  @ViewChild('canvas', { static: false })
  private canvas: ElementRef;

  @ViewChild('fileinput', { static: false })
  private fileinput: ElementRef;

  public escaneando = false;
  public datosQR = '';
  public loading: HTMLIonLoadingElement = null;

  handlerPermissions: any;
  initPlugin: boolean = false;

  constructor(private router: Router,private storage: StorageService,private auth: AuthenticationService) { }

  ngOnInit() {}

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

  salir() {
    this.auth.logout();
    this.storage.clear();
  }
  
  async comenzarEscaneo() {
    const allowed = await this.checkPermission();
    if (allowed) {
      this.escaneando = true;
      BarcodeScanner.hideBackground();
      const result = await BarcodeScanner.startScan({ targetedFormats: [SupportedFormat.QR_CODE] });
      if (result.hasContent) {
        this.escaneando = false;
        this.storage.setItem('MICLASE_DATA',result.content);
        this.router.navigate(['home/mi-clase']);
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
  
  public cargarImagenDesdeArchivo() : void {
    this.fileinput.nativeElement.click();
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
      this.storage.setItem('MICLASE_DATA',qrCode.data);
      this.router.navigate(['home/mi-clase']);
    }
    return this.datosQR !== '';
  }
  
  public verificarArchivoConQR(files: FileList): void {
    const file = files.item(0);
    const img = new Image();
    img.onload = () => {
      this.obtenerDatosQR(img);
    };
    img.src = URL.createObjectURL(file);
  }
  
  ionViewWillLeave() {
    this.detenerEscaneo();
  }

}
