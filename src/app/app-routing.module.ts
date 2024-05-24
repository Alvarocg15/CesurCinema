import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingComponent } from './landing/landing.component';
import { CarteleraComponent } from './cartelera/cartelera.component';
import { VoseComponent } from './vose/vose.component';
import { ProximamenteComponent } from './proximamente/proximamente.component';
import { PeliculaComponent } from './pelicula/pelicula.component';
import { EntradasComponent } from './entradas/entradas.component';
import { RegistroComponent } from './registro/registro.component';
import { CuentaComponent } from './cuenta/cuenta.component';
import { AuthGuard } from './services/auth-guard.service';
import { RoleGuard } from './services/role-guard.service';
import { MisEntradasComponent } from './cuenta/mis-entradas/mis-entradas.component';
import { AdministracionComponent } from './administracion/administracion.component';

const routes: Routes = [
  { path: '', component: LandingComponent },
  { path: 'cartelera', component: CarteleraComponent },
  { path: 'vose', component: VoseComponent },
  { path: 'proximamente', component: ProximamenteComponent },
  { path: 'pelicula', component: PeliculaComponent },
  { path: 'entradas', component: EntradasComponent},
  { path: 'registro', component: RegistroComponent },
  { path: 'cuenta', component: CuentaComponent, canActivate: [AuthGuard, RoleGuard], data: { expectedRole: 'ROLE_USER' }},
  { path: 'administracion', component: AdministracionComponent, canActivate: [AuthGuard, RoleGuard], data: { expectedRole: 'ROLE_ADMIN' }},
  { path: 'misEntradas', component: MisEntradasComponent, canActivate: [AuthGuard, RoleGuard], data: { expectedRole: 'ROLE_USER' }}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
