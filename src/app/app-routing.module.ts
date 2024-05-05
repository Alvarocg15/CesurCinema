import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingComponent } from './landing/landing.component';
import { CarteleraComponent } from './cartelera/cartelera.component';
import { VoseComponent } from './vose/vose.component';
import { ProximamenteComponent } from './proximamente/proximamente.component';
import { PeliculaComponent } from './pelicula/pelicula.component';

const routes: Routes = [
  { path: '', component: LandingComponent },
  { path: 'cartelera', component: CarteleraComponent },
  { path: 'vose', component: VoseComponent },
  { path: 'proximamente', component: ProximamenteComponent },
  { path: 'pelicula', component: PeliculaComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
