import { Component, ElementRef, OnInit, ViewChild,AfterViewInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Usuario } from 'src/app/model/usuario';
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
  private usuario = new Usuario

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
      }
    });
  }

  ngOnInit(): void {
    const navigationExtras: NavigationExtras = {
      state: {
        usuario: this.usuario
      }
    };
    this.router.navigate(['home/inicio'],navigationExtras);
      
  }

  segmentChanged($event) {
    this.router.navigate(['home/' + $event.detail.value]);
  }
}


