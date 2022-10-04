import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { IngresoRespuestaSecretaPage } from './ingreso-respuesta-secreta.page';

const routes: Routes = [
  {
    path: '',
    component: IngresoRespuestaSecretaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class IngresoRespuestaSecretaPageRoutingModule {}
