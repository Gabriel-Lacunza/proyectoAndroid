import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/model/Usuario';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-incorrecto',
  templateUrl: './incorrecto.page.html',
  styleUrls: ['./incorrecto.page.scss'],
})
export class IncorrectoPage implements OnInit {
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

}
