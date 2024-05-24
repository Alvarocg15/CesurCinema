import { Component } from '@angular/core';
import { Horarios } from '../pelicula/horarios/interface/horarios.interface';
import { HorariosService } from '../pelicula/horarios/horarios.service';

@Component({
  selector: 'app-administracion',
  templateUrl: './administracion.component.html',
  styleUrl: './administracion.component.css'
})
export class AdministracionComponent {

  isLoading = false;
  proyecciones: Horarios[] = [];

  constructor(private horariosService: HorariosService ) { }

  ngOnInit(): void {
    this.isLoading = true;
    this.horariosService.getProyecciones().subscribe((data: Horarios[]) => {
      this.proyecciones = data;
      this.isLoading = false;
    });
  }

}
