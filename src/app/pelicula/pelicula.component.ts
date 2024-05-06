import { Component } from '@angular/core';
import { Pelicula } from './interface/pelicula.interface';
import { PeliculaService } from './pelicula.service';

@Component({
  selector: 'app-pelicula',
  templateUrl: './pelicula.component.html',
  styleUrl: './pelicula.component.css'
})
export class PeliculaComponent {
  // pelicula: Pelicula = {} as Pelicula;
  pelicula: Pelicula[] = [];

  constructor(private peliculaService: PeliculaService) { }

  ngOnInit() {
    let peliculaId = localStorage.getItem('peliId');
    this.peliculaService.getPeliculaById(peliculaId!).subscribe(data => {
      this.pelicula = data;
      console.log(this.pelicula);
    });
  }

  eliminarId() {
    localStorage.removeItem('peliId');
  }
}
