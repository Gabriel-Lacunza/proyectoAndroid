import { Component, OnInit } from '@angular/core';
import { StorageService } from 'src/app/services/storage.service';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-mi-clase',
  templateUrl: './mi-clase.component.html',
  styleUrls: ['./mi-clase.component.scss'],
})
export class MiClaseComponent implements OnInit {

  public sede = '';
  public idAsignatura = '';
  public seccion = '';
  public nombreAsignatura = '';
  public nombreProfesor = '';
  public dia = '';
  public bloqueInicio = '';
  public bloqueTermino = '';
  public horaInicio = '';
  public horaFin = '';

  constructor(
    private storage: StorageService,private auth: AuthenticationService
  ) { }

  async ngOnInit(): Promise<void> {
    this.getDataMiClase();
  }

  async getDataMiClase(){


    this.storage.getItem('MICLASE_DATA').then( resultado => {
      if (resultado.value === "") {
        return;
      } else {
      this.sede = JSON.parse(resultado.value).sede;
      this.idAsignatura = JSON.parse(resultado.value).idAsignatura;
      this.seccion = JSON.parse(resultado.value).seccion;
      this.nombreAsignatura = JSON.parse(resultado.value).nombreAsignatura;
      this.nombreProfesor = JSON.parse(resultado.value).nombreProfesor;
      this.dia = JSON.parse(resultado.value).dia;
      this.bloqueInicio = JSON.parse(resultado.value).bloqueInicio;
      this.bloqueTermino = JSON.parse(resultado.value).bloqueTermino;
      this.horaInicio = JSON.parse(resultado.value).horaInicio;
      this.horaFin = JSON.parse(resultado.value).horaFin;
      }
    });
  }

  salir() {
    this.auth.logout();
    this.storage.clear();
  }

}
