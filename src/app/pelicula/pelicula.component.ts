import { Component } from '@angular/core';
import { Pelicula } from './interface/pelicula.interface';
import { PeliculaService } from './pelicula.service';

@Component({
  selector: 'app-pelicula',
  templateUrl: './pelicula.component.html',
  styleUrl: './pelicula.component.css'
})
export class PeliculaComponent {
  pelicula: Pelicula = {} as Pelicula;

  constructor(private peliculaService: PeliculaService) { }

  ngOnInit() {
    let peliculaId = localStorage.getItem('peliId');
    if (peliculaId !== null) {
      this.peliculaService.getPeliculaById(peliculaId).subscribe(pelicula => {
        console.log(pelicula);
        this.pelicula = pelicula;
        console.log(this.pelicula);
        this.eliminarId();
      });
    }
  }

  eliminarId() {
    localStorage.removeItem('peliId');
  }
}
