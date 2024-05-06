import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../enviroments/enviroment';
import { Pelicula } from './interface/pelicula.interface';


@Injectable({
  providedIn: 'root'
})

export class PeliculaService {
    private peliculaSource = new BehaviorSubject<Pelicula[]>([]);
    currentPelicula = this.peliculaSource.asObservable();

    private serviceUrl = `${environment.apiUrl}/peliculas/`;

    constructor(private http: HttpClient) { }



    getPeliculaById(id: string): Observable<Pelicula[]> {
      let url = `${this.serviceUrl}${id}`;
      let respuesta = this.http.get<Pelicula[]>(url);
      return respuesta;
    }
}
