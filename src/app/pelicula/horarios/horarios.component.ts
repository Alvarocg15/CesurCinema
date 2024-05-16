import { Component } from '@angular/core';
import { Horarios } from './interface/horarios.interface';
import { HorariosService } from './horarios.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-horarios',
  templateUrl: './horarios.component.html',
  styleUrl: './horarios.component.css'
})
export class HorariosComponent {

  horarios: Horarios[] = [];
  horarioId: string = '';
  selectedHorario:any = null;

  constructor(private horariosService: HorariosService, private router: Router) { }

  ngOnInit(){
    let horarioId = localStorage.getItem('peliId');
    this.horariosService.getHorariosById(horarioId!).subscribe(data => {
      this.horarios = data;
    });
  }

  selectedHorarioChange(horario: Horarios){
    this.selectedHorario = horario;
  }

  selectedSalaId(salaId:number){
    localStorage.setItem('salaId', salaId.toString()); // Convert salaId to a string
  }
  guardarDatos(){
    localStorage.setItem('horario', JSON.stringify(this.selectedHorario));
    this.router.navigate(['/entradas']);
  }

}
