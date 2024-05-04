import { Component, ViewEncapsulation } from '@angular/core';
import { CarouselHeroService } from './carousel-hero.service';

// import Swiper core and required modules
import SwiperCore, { Navigation, Pagination, Scrollbar, A11y, Autoplay } from 'swiper';
import { CarouselHero } from './interface/carousel-hero.interface';

// install Swiper modules
SwiperCore.use([Navigation, Pagination, Scrollbar, A11y, Autoplay]);

@Component({
  selector: 'app-carousel-hero',
  templateUrl: './carousel-hero.component.html',
  styleUrl: './carousel-hero.component.css',
  encapsulation: ViewEncapsulation.None,
})
export class CarouselHeroComponent {

  images: CarouselHero[] = [];

  constructor(private carouselHeroService: CarouselHeroService) { }
  ngOnInit() {
    this.carouselHeroService.getCarouselHero().subscribe(data => {
      console.log(data);
      this.images = data;
    }
    ); }
}


