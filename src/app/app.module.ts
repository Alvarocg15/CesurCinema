import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { SharedModule } from './shared/shared.module';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { registerLocaleData } from '@angular/common';
import localeEs from '@angular/common/locales/es';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { LandingComponent } from './landing/landing.component';
import { CarouselHeroComponent } from './landing/carousel-hero/carousel-hero.component';
import { SwiperModule } from 'swiper/angular';
import { CarouselPelisComponent } from './landing/carousel-pelis/carousel-pelis.component';
import { CarteleraComponent } from './cartelera/cartelera.component';
import { VoseComponent } from './vose/vose.component';
import { ProximamenteComponent } from './proximamente/proximamente.component';
import { PeliculaComponent } from './pelicula/pelicula.component';
import { HorariosComponent } from './pelicula/horarios/horarios.component';
import { EntradasComponent } from './entradas/entradas.component';
import { RegistroComponent } from './registro/registro.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CuentaComponent } from './cuenta/cuenta.component';
import { ConfirmacionCompraComponent } from './entradas/confirmacion-compra/confirmacion-compra.component';
import { MisEntradasComponent } from './cuenta/mis-entradas/mis-entradas.component';
import { AdministracionComponent } from './administracion/administracion.component';
import { AddProyeccionComponent } from './administracion/add-proyeccion/add-proyeccion.component';

registerLocaleData(localeEs);
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}
@NgModule({
  declarations: [
    AppComponent,
    LandingComponent,
    CarouselHeroComponent,
    CarouselPelisComponent,
    CarteleraComponent,
    VoseComponent,
    ProximamenteComponent,
    PeliculaComponent,
    HorariosComponent,
    EntradasComponent,
    RegistroComponent,
    CuentaComponent,
    ConfirmacionCompraComponent,
    MisEntradasComponent,
    AdministracionComponent,
    AddProyeccionComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    SharedModule,
    SwiperModule,
    FormsModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    ReactiveFormsModule
  ],
  providers: [
    provideClientHydration(),
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
