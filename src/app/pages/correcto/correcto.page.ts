import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/model/Usuario';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-correcto',
  templateUrl: './correcto.page.html',
  styleUrls: ['./correcto.page.scss'],
})
export class CorrectoPage implements OnInit {
  public user : Usuario;

  constructor(
    private activeroute: ActivatedRoute,
    private router: Router
  ) {
    const user = new Usuario;

    this.activeroute.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state){
        this.user = this.router.getCurrentNavigation().extras.state.user;
      }else{
        this.router.navigate(["/login"]);
      }
    });
  }

  ngOnInit() { }

  iniciarSesion() {
    const navigationExtras: NavigationExtras = {
        };
    this.router.navigate(['/login'], navigationExtras);
  }

}
