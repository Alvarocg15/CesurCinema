import { Injectable } from '@angular/core';
import { CarouselPelis } from './interface/carousel-pelis.interface';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { environment } from '../../../enviroments/enviroment';

@Injectable({providedIn: 'root'})
export class CarouselPelisService {
  private carouselPelisSource = new BehaviorSubject<CarouselPelis[]>([]);
  currentCarouselPelis = this.carouselPelisSource.asObservable();

  private serviceUrl = `${environment.apiUrl}/carousel_pelis`;

  constructor(private http: HttpClient) { }

  getCarouselPelis() {
    let respuesta = this.http.get<CarouselPelis[]>(this.serviceUrl);
    return respuesta;
  }

}
