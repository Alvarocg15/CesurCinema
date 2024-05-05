import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../enviroments/enviroment';
import { Proximamente } from './interface/proximamente.interface';


@Injectable({
  providedIn: 'root'
})

export class ProximamenteService {
    private proximamenteSource = new BehaviorSubject<Proximamente[]>([]);
    currentProximamente = this.proximamenteSource.asObservable();

    private serviceUrl = `${environment.apiUrl}/proximamente`;

    constructor(private http: HttpClient) { }

    getProximamente(): Observable<Proximamente[]> {
      let respuesta = this.http.get<Proximamente[]>(this.serviceUrl);
      return respuesta;
    }
}
