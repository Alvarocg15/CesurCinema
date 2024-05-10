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

  constructor(private horariosService: HorariosService, private router: Router) { }

  ngOnInit(){
    let horarioId = localStorage.getItem('peliId');
    this.horariosService.getHorariosById(horarioId!).subscribe(data => {
      console.log(data);
      this.horarios = data;
    });
  }

}
