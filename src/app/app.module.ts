import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { AppComponent } from './app.component';
<<<<<<< HEAD
=======
import { AppRoutingModule } from './app-routing.module';
import { DatabaseService } from './services/database.service';
import { StorageService } from './services/storage.service';
import { SQLiteService } from './services/sqlite.service';
import { AuthenticationService } from './services/authentication.service';
import { AuthGuardService } from './services/auth-guard.service';
>>>>>>> qrNativo
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [AppComponent],
<<<<<<< HEAD
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, HttpClientModule],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
=======
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, HttpClientModule],
  providers: [
    DatabaseService,
    StorageService,
    SQLiteService,
    AuthenticationService,
    AuthGuardService,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
>>>>>>> qrNativo
  bootstrap: [AppComponent],
})
export class AppModule {}
