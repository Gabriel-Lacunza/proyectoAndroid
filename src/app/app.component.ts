import { Component } from '@angular/core';
import { Platform } from '@ionic/angular';
import { AuthenticationService } from './services/authentication.service';
import { DatabaseService } from './services/database.service';

import { log } from './model/Mensajes';
//import { AuthService } from './services/authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  
  constructor(
    private platform: Platform,
    private databaseService: DatabaseService,
    private authenticationService: AuthenticationService,
    private db: DatabaseService,
  ) {
    this.StartApp();
  }

  getErrorMessage(method: string, msg: string): string {
    return `AppComponent error, Method ${method}. ${msg}`;
  }

  alertError(method: string, msg: string) {
    const message = this.getErrorMessage(method, msg);
    console.log(message);
    alert(message);
  }
/*
  initializeApp() {
    this.platform.ready().then(async () => {
      this.databaseService.initializeDatabase().then(isReady => {
        console.log('METHOD initializeApp.initializeDatabase ' + isReady);
      });
      this.authenticationService.initializeAuthentication().then(isReady => {
        console.log('METHOD initializeApp.initializeAuthentication ' + isReady);
      });
    });
  }*/

  async StartApp() {

    log('StartApp', 'Iniciando aplicación');
    
    this.platform.ready().then(async () => {

      log('StartApp', 'Plataforma lista');

      await this.db.StartDatabaseService(false).then(async (isRunning) => {

        log('StartApp', isRunning? 'Servicio de BD iniciado': 'Servicio de BD no iniciado');

      });
    });



  }

}
