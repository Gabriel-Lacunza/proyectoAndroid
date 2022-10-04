import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { IngresoRespuestaSecretaPageRoutingModule } from './ingreso-respuesta-secreta-routing.module';

import { IngresoRespuestaSecretaPage } from './ingreso-respuesta-secreta.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    IngresoRespuestaSecretaPageRoutingModule
  ],
  declarations: [IngresoRespuestaSecretaPage]
})
export class IngresoRespuestaSecretaPageModule {}
