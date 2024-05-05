import { Component } from '@angular/core';
import { Cartelera } from './interface/cartelera.interface';
import { CarteleraService } from './cartelera.service';

@Component({
  selector: 'app-cartelera',
  templateUrl: './cartelera.component.html'
})
export class CarteleraComponent {

  cartelera: Cartelera[] = [];

  constructor(private carteleraService: CarteleraService) { }

  ngOnInit() {
    this.carteleraService.getCartelera().subscribe(data => {
      this.cartelera = data;
    });
  }
}
