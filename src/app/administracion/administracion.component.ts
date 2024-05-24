import { Component } from '@angular/core';
import { Horarios } from '../pelicula/horarios/interface/horarios.interface';
import { HorariosService } from '../pelicula/horarios/horarios.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-administracion',
  templateUrl: './administracion.component.html',
  styleUrl: './administracion.component.css'
})
export class AdministracionComponent {

  isLoading = false;
  proyecciones: Horarios[] = [];

  constructor(private horariosService: HorariosService, private snackBar: MatSnackBar ) { }

  ngOnInit(): void {
    this.isLoading = true;
    this.horariosService.getProyecciones().subscribe((data: Horarios[]) => {
      this.proyecciones = data;
      this.isLoading = false;
    });
  }

  deleteProyeccion(id: number): void {
    this.horariosService.deleteProyeccion(id).subscribe(() => {
      this.proyecciones = this.proyecciones.filter(proyeccion => proyeccion.proyeccion_id !== id);
    });
    this.snackBar.open('Proyeccion Borrada con éxito', 'Cerrar', {
      duration: 3000,
      horizontalPosition: 'right',
    });
  }

}
