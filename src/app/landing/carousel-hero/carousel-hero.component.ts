import { Component, ViewEncapsulation } from '@angular/core';

// import Swiper core and required modules
import SwiperCore, { Navigation, Pagination, Scrollbar, A11y, Autoplay } from 'swiper';

// install Swiper modules
SwiperCore.use([Navigation, Pagination, Scrollbar, A11y, Autoplay]);

@Component({
  selector: 'app-carousel-hero',
  templateUrl: './carousel-hero.component.html',
  styleUrl: './carousel-hero.component.css',
  encapsulation: ViewEncapsulation.None,
})
export class CarouselHeroComponent {

}


