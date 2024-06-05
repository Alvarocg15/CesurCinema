import { AfterViewInit, Component, ViewChild, ElementRef } from '@angular/core';
import { EntradasService } from './entradas.service';
import { Asiento } from './interface/asiento.interface';
import { CurrencyPipe } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmacionCompraComponent } from './confirmacion-compra/confirmacion-compra.component';
import { CustomJwtPayload } from '../interface/CustomJwtPayload.interface';
import { Pelicula } from '../pelicula/interface/pelicula.interface';
import { PeliculaService } from '../pelicula/pelicula.service';
import { SalaService } from '../pelicula/horarios/sala.service';
import { Sala } from '../pelicula/horarios/interface/sala.interface';
import { AuthService } from '../services/auth-service.service';

declare var paypal:any;

interface EntradaId {
  entrada_user: number;
  entrada_pelicula: string;
  entrada_proyeccion: number;
  entrada_sala: number;
  entrada_asiento: number;
}

@Component({
  selector: 'app-entradas',
  templateUrl: './entradas.component.html',
  styleUrl: './entradas.component.css'
})

export class EntradasComponent {

  ocupados: any[] = [];
  filas: any[] = [];
  titulopeli: string = '';
  sala: Sala[] = [];
  nombre_sala: string = '';
  butacasSeleccionadas: Asiento[] = [];
  precio: number = 0;
  paidFor: boolean = false;
  usuario!: CustomJwtPayload;
  peli: Pelicula[] = [];
  isLoading = false;
  pequena: boolean = false;


  constructor(private entradaService: EntradasService, private dialog: MatDialog, private peliculaService: PeliculaService, private salaService: SalaService, private authService: AuthService ) { }

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
          // Open the purchase confirmation dialog
          this.dialog.open(ConfirmacionCompraComponent);
          setTimeout(() => {
            this.dialog.closeAll();
            this.addEntradas();
          }, 3000);
        },
        onError: (err: any) => {
          console.log(err);
        }
      })
      .render(this.paypalElement!.nativeElement);
  }

  ngOnInit() {
    this.isLoading = true;
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
    this.getPeliculaById();
    this.getSalaById();
    this.isLoading = false;
  }

  mostrarInfoAsieto(asiento: Asiento) {
    const index = this.butacasSeleccionadas.indexOf(asiento);
    if (index !== -1) {
      // El asiento ya está en la lista, así que lo eliminamos
      this.butacasSeleccionadas.splice(index, 1);
      asiento.asiento_clickado = false;
      this.precio -= 6.5;
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

  getPeliculaById() {
    let peliculaId = localStorage.getItem('peliId');
    this.peliculaService.getPeliculaById(peliculaId!).subscribe((peliculaId) => {
      this.peli = peliculaId;
      console.log("pelieee"+JSON.stringify(this.peli));
    });
  }

  // getSalaById() {
  //   let salaId = localStorage.getItem('salaId');
  //   this.salaService.getSalaById(salaId!).subscribe((salaId) => {
  //     this.sala = salaId;
  //     this.nombre_sala = this.sala[0].sala_nombre;
  //     console.log("sala: "+JSON.stringify(this.sala[0].sala_id));
  //   });
  // }
  async getSalaById() {
    let salaId = localStorage.getItem('salaId');
    await this.salaService.getSalaById(salaId!).toPromise().then((salaId) => {
      this.sala = salaId!;
      this.nombre_sala = this.sala[0].sala_nombre;
      if (this.sala[0].sala_numero_asientos === 16){
        this.pequena = true;
      }
      console.log("sala: "+JSON.stringify(this.sala[0].sala_id));
    });
  }

  addEntradas() {
    let horario = localStorage.getItem('horario');
    let horarioObj = JSON.parse(horario!);
    let sala = localStorage.getItem('salaId');
    let salaId = JSON.parse(sala!);
    let proyeccionId = horarioObj.proyeccion_id;
    let userId = this.authService.isAuthenticated() ? this.authService.getUserId() : 19;
    this.butacasSeleccionadas.forEach(asiento => {
      const entrada: EntradaId = {
        entrada_user: userId,
        entrada_pelicula: this.peli[0].pelicula_id,
        entrada_proyeccion: proyeccionId,
        entrada_sala: salaId,
        entrada_asiento: asiento.asiento_id
      };
      this.entradaService.addEntradas(entrada).subscribe(data => {
        console.log(data);
      });
    });
  }
}
