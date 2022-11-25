import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { IonicModule } from "@ionic/angular";

import { InicioComponent } from "./inicio/inicio.component";
import { MiClaseComponent } from "./mi-clase/mi-clase.component";
import { ApiComponent } from "./api/api.component";
import { QrComponent } from "./qr/qr.component";

@NgModule({
    declarations:[
        InicioComponent,
        MiClaseComponent,
        ApiComponent,
        QrComponent,
    ],
    imports:[
        CommonModule,
        IonicModule,
        FormsModule
    ],
    exports:[
        InicioComponent,
        MiClaseComponent,
        ApiComponent,
        QrComponent,
        FormsModule
    ]
})

export class ComponentsModule { }