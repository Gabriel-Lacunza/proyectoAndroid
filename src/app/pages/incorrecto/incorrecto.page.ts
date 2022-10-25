import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/model/Usuario';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';
import { StorageService } from '../../services/storage.service';

@Component({
  selector: 'app-incorrecto',
  templateUrl: './incorrecto.page.html',
  styleUrls: ['./incorrecto.page.scss'],
})
export class IncorrectoPage implements OnInit {
  public user : Usuario;

  constructor(
    private activeroute: ActivatedRoute,
    private router: Router,
    private storage: StorageService,
  ) {
    const user = new Usuario;
  }

  ngOnInit() {
    this.storage.clear();
  }

  iniciarSesion() {
    this.router.navigate(['/login']);
  }

}
