import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InicioComponent } from "../../components/inicio/inicio.component"
import { MiClaseComponent } from "../../components/mi-clase/mi-clase.component"
import { ApiComponent } from "../../components/api/api.component"
<<<<<<< HEAD
=======
import { QrComponent } from "../../components/qr/qr.component"
>>>>>>> qrNativo

import { HomePage } from './home.page';

const routes: Routes = [
  {
    path: '',
    component: HomePage,
    children: [
      {
        path: "inicio",
        component: InicioComponent
      },
      {
        path: "mi-clase",
        component: MiClaseComponent
      },
      {
<<<<<<< HEAD
        path: "api",
        component: ApiComponent
=======
        path: "foro",
        component: ApiComponent
      },
      {
        path: "qr",
        component: QrComponent
>>>>>>> qrNativo
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomePageRoutingModule {}
