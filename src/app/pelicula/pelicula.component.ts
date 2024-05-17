import { Component } from '@angular/core';
import { Pelicula } from './interface/pelicula.interface';
import { PeliculaService } from './pelicula.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-pelicula',
  templateUrl: './pelicula.component.html',
  styleUrl: './pelicula.component.css'
})
export class PeliculaComponent {
  pelicula: Pelicula[] = [];
  safeUrl: SafeResourceUrl | undefined;

  constructor(private peliculaService: PeliculaService, private sanitizer: DomSanitizer) { }


  ngOnInit() {
    let peliculaId = localStorage.getItem('peliId');
    this.peliculaService.getPeliculaById(peliculaId!).subscribe(data => {
      this.pelicula = data;
      this.safeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.pelicula[0].pelicula_trailer);
      console.log(this.pelicula);
      localStorage.setItem('TituloPeli', JSON.stringify(this.pelicula[0].pelicula_titulo));
    });
  }

  eliminarId() {
    localStorage.removeItem('peliId');
  }
}
