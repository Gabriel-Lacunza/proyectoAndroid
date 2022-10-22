import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { AnimationController } from '@ionic/angular';

@Component({
  selector: 'app-miclase',
  templateUrl: './miclase.page.html',
  styleUrls: ['./miclase.page.scss'],
})
export class MiclasePage implements OnInit {

  @ViewChild("icon", { read: ElementRef, static: true}) icon: ElementRef;
  public datosQR: string;
  public data: object;

  constructor(
    private activeroute: ActivatedRoute,
    private router: Router,
    private animationController: AnimationController,
  ) { 
    this.activeroute.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {

        this.datosQR = this.router.getCurrentNavigation().extras.state.datosQR;
        
      } else {
        this.router.navigate(['/ingreso']);
      }

    })
    
  }


  ngOnInit() {
    this.data = JSON.parse(this.datosQR);
  }

//   public ngAfterViewInit(): void {
//     const animation = this.animationController
//       .create()
//       .addElement(this.icon.nativeElement)
//       .iterations(Infinity)
//       .duration(5000)
//       .fromTo("transform", "rotate(0)", "rotate(380deg)");
    
//     animation.play();


// }
cerrarSesion() {
  const navigationExtras: NavigationExtras = {
      };
  this.router.navigate(['/login'], navigationExtras);
}
}