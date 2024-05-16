import { Component } from '@angular/core';
import { EntradasService } from './entradas.service';
import { Asiento } from './interface/asiento.interface';

@Component({
  selector: 'app-entradas',
  templateUrl: './entradas.component.html',
  styleUrl: './entradas.component.css'
})
export class EntradasComponent {

  ocupados: any[] = [];
  filas: any[] = [];

  constructor(private entradaService: EntradasService) { }

  ngOnInit() {
    this.entradaService.getEntradas().subscribe(data => {
      data.forEach(entrada => {
        this.ocupados.push(entrada.entrada_asiento.asiento_id);
      });
      console.log(this.ocupados);
    })

    this.entradaService.getAsientos().subscribe(data => {
      const grouped = data.reduce((groups:{[key:number]: any[]}, asiento) => {
        const key = asiento.asiento_fila;
        if (!groups[key]) {
          groups[key] = [];
        }
        // Comprobar si asiento_id está en ocupados
        if (this.ocupados.includes(asiento.asiento_id)) {
          asiento.asiento_disponible = 'N';
        } else {
          asiento.asiento_disponible = 'Y';
        }
        asiento.asiento_clickado = false;
        groups[key].push(asiento);
        return groups;
      }, {});
      this.filas = Object.keys(grouped).map(key => ({ fila: key, asientos: grouped[Number(key)] }));
    });
  }

  mostrarInfoAsieto(asiento: Asiento) {
    asiento.asiento_clickado = !asiento.asiento_clickado;
    console.log(asiento);
  }
}
