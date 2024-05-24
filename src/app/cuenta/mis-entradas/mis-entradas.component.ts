import { Component } from '@angular/core';
import { EntradasService } from './entradas.service';
import { Entrada } from '../../entradas/interface/entrada.interface';

@Component({
  selector: 'app-mis-entradas',
  templateUrl: './mis-entradas.component.html',
  styleUrl: './mis-entradas.component.css'
})
export class MisEntradasComponent {

  isLoading = false;
  entradas: Entrada[] = [];
  tituloPeli: string = '';
  nombreSala: string = '';
  horarioPeli: string = '';

  constructor(private entradasService: EntradasService) { }

  ngOnInit(): void {
    this.isLoading = true;
    this.entradasService.getEntradasByUser().subscribe((data: Entrada[]) => {
      this.entradas = data;
      this.isLoading = false;
    });
  }
}
