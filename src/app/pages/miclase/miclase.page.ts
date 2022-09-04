import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';

@Component({
  selector: 'app-miclase',
  templateUrl: './miclase.page.html',
  styleUrls: ['./miclase.page.scss'],
})
export class MiclasePage implements OnInit {

  public datosQR: string;
  public data: object;

  constructor(
    private activeroute: ActivatedRoute,
    private router: Router
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


}
