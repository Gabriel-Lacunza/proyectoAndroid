import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from './services/auth-guard.service';
import { LoginGuardService } from './services/login-guard.service';

const routes: Routes = [
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule),
    canActivate: [LoginGuardService]
  },
  { 
    path: 'home',
    loadChildren: () => import('./pages/home/home.module').then( m => m.HomePageModule),
    canActivate: [AuthGuardService]
  },
  {
    path: 'create-user',
    loadChildren: () => import('./pages/create-user/create-user.module').then( m => m.CreateUserPageModule),
  },
  {
    path: 'delete-user',
    loadChildren: () => import('./pages/delete-user/delete-user.module').then( m => m.DeleteUserPageModule)
  },
  {
    path: 'miclase',
    loadChildren: () => import('./pages/miclase/miclase.module').then( m => m.MiclasePageModule)
  },
  { 
    path: 'recuperar',
    loadChildren: () => import('./pages/recuperar-contrasenna/recuperar-contrasenna.module').then( m => m.RecuperarContrasennaPageModule)
  },
  {
    path: 'rs',
    loadChildren: () => import('./pages/ingreso-respuesta-secreta/ingreso-respuesta-secreta.module').then( m => m.IngresoRespuestaSecretaPageModule)
  },
  {
    path: 'correcto',
    loadChildren: () => import('./pages/correcto/correcto.module').then( m => m.CorrectoPageModule)
  },
  {
    path: 'incorrecto',
    loadChildren: () => import('./pages/incorrecto/incorrecto.module').then( m => m.IncorrectoPageModule)
  },
  {
    path: '',
    redirectTo: "login",
    pathMatch: "full"
  },
  {
    path: '**',
    loadChildren: () => import('./pages/no-encontrado/no-encontrado.module').then( m => m.NoEncontradoPageModule)
  },


];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
