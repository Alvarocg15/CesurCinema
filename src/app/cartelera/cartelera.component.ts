import { Component } from '@angular/core';
import { Cartelera } from './interface/cartelera.interface';
import { CarteleraService } from './cartelera.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cartelera',
  templateUrl: './cartelera.component.html'
})
export class CarteleraComponent {

  cartelera: Cartelera[] = [];
  isLoading = false;

  constructor(private carteleraService: CarteleraService, private router: Router) { }

  ngOnInit() {
    this.isLoading = true;
    this.carteleraService.getCartelera().subscribe(data => {
      this.cartelera = data;
      this.isLoading = false;
    });
  }

  guardarId(id: string) {
    localStorage.setItem('peliId', id);
    this.router.navigate(['/pelicula']);
  }

}
