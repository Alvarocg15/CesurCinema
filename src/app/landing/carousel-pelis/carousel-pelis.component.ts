import { Component, ViewEncapsulation } from '@angular/core';

// import Swiper core and required modules
import SwiperCore, { Navigation, Pagination, Scrollbar, A11y, Autoplay, EffectCoverflow } from 'swiper';
import { CarouselPelis } from './interface/carousel-pelis.interface';
import { CarouselPelisService } from './carousel-pelis.service';

// install Swiper modules
SwiperCore.use([Navigation, Pagination, Scrollbar, A11y, Autoplay, EffectCoverflow]);

@Component({
  selector: 'app-carousel-pelis',
  templateUrl: './carousel-pelis.component.html',
  styleUrl: './carousel-pelis.component.css',
  encapsulation: ViewEncapsulation.ShadowDom,
})
export class CarouselPelisComponent {

  pelis: CarouselPelis[] = [];

  constructor(private carouselPelisService: CarouselPelisService) { }

  ngOnInit() {
    this.carouselPelisService.getCarouselPelis().subscribe(data => {
      console.log(data);
      this.pelis = data;
    }
    );
  }
}
