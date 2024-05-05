import { Component } from '@angular/core';
import { Vose } from './interface/vose.interface';
import { VoseService } from './vose.service';

@Component({
  selector: 'app-vose',
  templateUrl: './vose.component.html'
})
export class VoseComponent {

  vose: Vose[] = [];

  constructor(private voseService: VoseService) { }

  ngOnInit() {
    this.voseService.getVose().subscribe(data => {
      this.vose = data;
    });
  }
}
