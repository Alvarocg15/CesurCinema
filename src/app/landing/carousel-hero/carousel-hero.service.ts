import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../../enviroments/enviroment';
import { CarouselHero } from './interface/carousel-hero.interface';


@Injectable({
  providedIn: 'root'
})

export class CarouselHeroService {
    private carouselHeroSource = new BehaviorSubject<CarouselHero[]>([]);
    currentCarouselHero = this.carouselHeroSource.asObservable();

    private serviceUrl = `${environment.apiUrl}/carousel_hero`;

    constructor(private http: HttpClient) { }

    getCarouselHero(): Observable<CarouselHero[]> {
      let respuesta = this.http.get<CarouselHero[]>(this.serviceUrl);
      return respuesta;
    }
}
