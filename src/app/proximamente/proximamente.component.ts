import { Component } from '@angular/core';
import { Proximamente } from './interface/proximamente.interface';
import { ProximamenteService } from './proximamente.service';

@Component({
  selector: 'app-proximamente',
  templateUrl: './proximamente.component.html'
})
export class ProximamenteComponent {

  proximamente: Proximamente[] = [];

  constructor(private proximamenteService: ProximamenteService) { }

  ngOnInit() {
    this.proximamenteService.getProximamente().subscribe(data => {
      this.proximamente = data;
    });
  }
}
