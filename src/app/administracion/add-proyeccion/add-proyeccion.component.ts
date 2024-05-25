import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from '../../services/auth-service.service';
import { HorariosService } from '../../pelicula/horarios/horarios.service';
import { CarteleraService } from '../../cartelera/cartelera.service';
import { SalaService } from '../../pelicula/horarios/sala.service';
import { Sala } from '../../pelicula/horarios/interface/sala.interface';
import { Cartelera } from '../../cartelera/interface/cartelera.interface';
import { environment } from '../../../enviroments/enviroment';

@Component({
  selector: 'app-add-proyeccion',
  templateUrl: './add-proyeccion.component.html',
  styleUrl: './add-proyeccion.component.css'
})
export class AddProyeccionComponent {

  peliculaId: any;
  salaId: any;
  peliculas: Cartelera[] = [];
  salas: Sala[] = [];
  registerForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private http: HttpClient, private snackBar: MatSnackBar,private authService: AuthService,
    private horariosService: HorariosService, private carteleraService: CarteleraService,private salaService: SalaService) {
      this.registerForm = this.formBuilder.group({
        proyeccion_pelicula: [''],
        proyeccion_sala: [''],
        proyeccion_hora_comienzo: this.formBuilder.control(''),
      });
  }

  ngOnInit() {
    this.carteleraService.getCartelera().subscribe((peliculas) => {
      this.peliculas = peliculas;
      this.registerForm.get('proyeccion_pelicula')!.setValue(this.peliculaId);
    });

    this.salaService.getSalas().subscribe((salas) => {
      this.salas = salas;
      this.registerForm.get('proyeccion_sala')!.setValue(this.salaId);
    });
  }

  addProyeccion() {
    this.peliculaId = this.registerForm.get('proyeccion_pelicula')!.value;
    this.salaId = this.registerForm.get('proyeccion_sala')!.value;

    this.http.post(`${environment.apiUrl}/addProyeccion`, this.registerForm.value, { observe: 'response', responseType: 'text' }).subscribe(
      response => {
        // Si el estado de la respuesta es 201, significa que el usuario se creó correctamente
        if (response.status === 200) {
          this.snackBar.open('Proyección creada correctamente', 'Cerrar', {
            duration: 3000,
            horizontalPosition: 'right',
          });
          setTimeout(() => {
            location.reload();
          }), 3000;
        }
      },
      error => {
        // Si el estado de la respuesta es 400, significa que ya hay un usuario registrado
        if (error.status === 400) {
          this.snackBar.open('Error al crear la proyección', 'Cerrar', {
            duration: 3000,
            horizontalPosition: 'right'
          });
        } else {
          // Imprime el error en la consola
          console.error(error);
        }
      }
    );
  }
}
