import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../enviroments/enviroment';
import { Vose } from './interface/vose.interface';


@Injectable({
  providedIn: 'root'
})

export class VoseService {
    private voseSource = new BehaviorSubject<Vose[]>([]);
    currentVose = this.voseSource.asObservable();

    private serviceUrl = `${environment.apiUrl}/vose`;

    constructor(private http: HttpClient) { }

    getVose(): Observable<Vose[]> {
      let respuesta = this.http.get<Vose[]>(this.serviceUrl);
      return respuesta;
    }
}
