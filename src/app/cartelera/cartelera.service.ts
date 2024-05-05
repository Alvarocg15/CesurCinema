import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Cartelera } from './interface/cartelera.interface';
import { environment } from '../../enviroments/enviroment';


@Injectable({
  providedIn: 'root'
})

export class CarteleraService {
    private carteleraSource = new BehaviorSubject<Cartelera[]>([]);
    currentCartelera = this.carteleraSource.asObservable();

    private serviceUrl = `${environment.apiUrl}/cartelera`;

    constructor(private http: HttpClient) { }

    getCartelera(): Observable<Cartelera[]> {
      let respuesta = this.http.get<Cartelera[]>(this.serviceUrl);
      return respuesta;
    }
}
