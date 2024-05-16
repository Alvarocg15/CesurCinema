import { BehaviorSubject, Observable } from "rxjs";
import { Asiento } from "./interface/asiento.interface";
import { Injectable } from "@angular/core";
import { environment } from "../../enviroments/enviroment";
import { HttpClient } from "@angular/common/http";
import { Entrada } from "./interface/entrada.interface";


@Injectable({
  providedIn: 'root'
})

export class EntradasService {
  private asientoSource = new BehaviorSubject<Asiento[]>([]);
  currentAsiento = this.asientoSource.asObservable();

  private serviceUrl = `${environment.apiUrl}/asientos`;
  private serviceUrl2 = `${environment.apiUrl}/entradasByProyeccion`;

  constructor(private http: HttpClient) { }

  getAsientos(): Observable<Asiento[]> {
    let respuesta = this.http.get<Asiento[]>(this.serviceUrl);
    return respuesta;
  }

  getEntradas(): Observable<Entrada[]> {
    let idProyeccion = localStorage.getItem('horario');
    let response = JSON.parse(idProyeccion!);
    let proyeccionId = response.proyeccion_id;
    console.log(proyeccionId);
    let url = `${this.serviceUrl2}/${proyeccionId}`;
    let respuesta = this.http.get<Entrada[]>(url);
    return respuesta;
  }
}
