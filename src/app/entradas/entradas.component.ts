import { AfterViewInit, Component, ViewChild, ElementRef } from '@angular/core';
import { EntradasService } from './entradas.service';
import { Asiento } from './interface/asiento.interface';
import { CurrencyPipe } from '@angular/common';

declare var paypal:any;

@Component({
  selector: 'app-entradas',
  templateUrl: './entradas.component.html',
  styleUrl: './entradas.component.css'
})
export class EntradasComponent {

  ocupados: any[] = [];
  filas: any[] = [];
  titulopeli: string = '';
  sala: string = '';
  butacasSeleccionadas: Asiento[] = [];
  precio: number = 0;
  paidFor: boolean = false;

  constructor(private entradaService: EntradasService) { }

  @ViewChild('paypal', { static: true }) paypalElement: ElementRef | undefined;

  ngAfterViewInit(): void {
    paypal
      .Buttons({
        createOrder: (data:any, actions:any) => {
          // Set up the transaction
          return actions.order.create({
            purchase_units: [{
              amount: {
                // currency_code: 'EUR',
                value: this.precio // Replace this with the total amount
              }
            }]
          });
        },
        onApprove: async (data:any, actions:any) => {
          // Capture the funds from the transaction
          const order = await actions.order.capture();
          this.paidFor = true;
          console.log(order);
        },
        onError: (err: any) => {
          console.log(err);
        }
      })
      .render(this.paypalElement!.nativeElement);
  }

  ngOnInit() {
    this.entradaService.getEntradas().subscribe(data => {
      data.forEach(entrada => {
        this.ocupados.push(entrada.entrada_asiento.asiento_id);
      });
      console.log(this.ocupados);
      this.getInfoPelicula();
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
    const index = this.butacasSeleccionadas.indexOf(asiento);
    if (index !== -1) {
      // El asiento ya está en la lista, así que lo eliminamos
      this.butacasSeleccionadas.splice(index, 1);
      asiento.asiento_clickado = false;
    } else {
      // El asiento no está en la lista, así que lo añadimos
      // solo si hay menos de 6 asientos seleccionados
      if (this.butacasSeleccionadas.length < 6) {
        this.butacasSeleccionadas.push(asiento);
        asiento.asiento_clickado = true;
        this.precio = 6.5 * this.butacasSeleccionadas.length;
      }
    }
  }

  getInfoPelicula() {
    let idProyeccion = localStorage.getItem('TituloPeli');
    let response = JSON.parse(idProyeccion!);
    this.titulopeli = response;

    let sala = localStorage.getItem('horario');
    let response2 = JSON.parse(sala!);
    this.sala = response2.proyeccion_sala.sala_nombre;

  }
}
