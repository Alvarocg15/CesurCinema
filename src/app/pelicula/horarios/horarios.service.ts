import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { Horarios } from "./interface/horarios.interface";
import { environment } from "../../../enviroments/enviroment";
import { HttpClient } from "@angular/common/http";


@Injectable({
  providedIn: 'root'
})

export class HorariosService {

  private horariosSource = new BehaviorSubject<Horarios[]>([]);
  private currentHorario = this.horariosSource.asObservable();

  private serviceUrl = `${environment.apiUrl}/proyecciones/`

  constructor(private http: HttpClient) {  }

  getHorariosById(id: string) {
    let url = `${this.serviceUrl}${id}`;
    let respuesta = this.http.get<Horarios[]>(url);
    return respuesta;
  }

  getProyecciones() {
    let respuesta = this.http.get<Horarios[]>(this.serviceUrl);
    return respuesta;
  }

}
