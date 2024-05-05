import { Component } from '@angular/core';
import { Proximamente } from './interface/proximamente.interface';
import { ProximamenteService } from './proximamente.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-proximamente',
  templateUrl: './proximamente.component.html'
})
export class ProximamenteComponent {

  proximamente: Proximamente[] = [];


  constructor(private proximamenteService: ProximamenteService, private router: Router) { }

  ngOnInit() {
    this.proximamenteService.getProximamente().subscribe(data => {
      this.proximamente = data;
      console.log(this.proximamente);
    });
  }

  guardarId(id: string) {
    localStorage.setItem('peliId', id);
    this.router.navigate(['/pelicula']);
  }

}
