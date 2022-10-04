import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule }  from '@ionic/angular';

import { InicioComponent } from './inicio/inicio.component';
import { MiClaseComponent } from './mi-clase/mi-clase.component';

@NgModule({
  declarations: [
    InicioComponent,
    MiClaseComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    FormsModule
  ],
  exports: [
    InicioComponent,
    MiClaseComponent,
    FormsModule
  ]
})
export class ComponentsModule { }