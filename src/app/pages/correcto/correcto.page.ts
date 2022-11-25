import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/model/usuario';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';
import { StorageService } from '../../services/storage.service';

@Component({
  selector: 'app-correcto',
  templateUrl: './correcto.page.html',
  styleUrls: ['./correcto.page.scss'],
})
export class CorrectoPage implements OnInit {
  public user : Usuario;
  public password: string;

  constructor(
    private activeroute: ActivatedRoute,
    private router: Router,
    private storage: StorageService,
  ) {
    const user = new Usuario;
  }

  ngOnInit() { 
    this.getPassword();
    this.storage.clear();
  }

  getPassword() {
    this.storage.getItem('USER_DATA').then( resultado => {
      console.log(eval(resultado.value)[0].password);
      this.password = eval(resultado.value)[0].password;
    });
  }

  iniciarSesion() {
    this.router.navigate(['/login']);
  }



}
