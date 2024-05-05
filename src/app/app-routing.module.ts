import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingComponent } from './landing/landing.component';
import { CarteleraComponent } from './cartelera/cartelera.component';

const routes: Routes = [
  { path: '', component: LandingComponent },
  { path: 'cartelera', component: CarteleraComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
