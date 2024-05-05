import { Component } from '@angular/core';
import { Vose } from './interface/vose.interface';
import { VoseService } from './vose.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-vose',
  templateUrl: './vose.component.html'
})
export class VoseComponent {

  vose: Vose[] = [];

  constructor(private voseService: VoseService, private router: Router) { }

  ngOnInit() {
    this.voseService.getVose().subscribe(data => {
      this.vose = data;
    });
  }

  guardarId(id: string) {
    localStorage.setItem('peliId', id);
    this.router.navigate(['/pelicula']);
  }

}
