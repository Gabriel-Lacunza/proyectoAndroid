import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InicioComponent } from 'src/app/component/inicio/inicio.component';
import { MiClaseComponent } from 'src/app/component/mi-clase/mi-clase.component';

import { HomePage } from './home.page';

const routes: Routes = [
  {
    path: '',
    component: HomePage,
    children: [
      {
        path: "inico",
        component: InicioComponent
      },
      {
        path: "miClase",
        component: MiClaseComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomePageRoutingModule {}
