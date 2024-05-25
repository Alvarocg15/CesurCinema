import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { environment } from "../../../enviroments/enviroment";
import { HttpClient } from "@angular/common/http";
import { Sala } from "./interface/sala.interface";


@Injectable({
  providedIn: 'root'
})

export class SalaService {

  private salaSource = new BehaviorSubject<Sala[]>([]);
  private currentSala = this.salaSource.asObservable();

  private serviceUrl = `${environment.apiUrl}/sala/`

  constructor(private http: HttpClient) {  }

  getSalaById(id: string) {
    let url = `${this.serviceUrl}${id}`;
    let respuesta = this.http.get<Sala[]>(url);
    return respuesta;
  }

  getSalas() {
    let respuesta = this.http.get<Sala[]>(`${environment.apiUrl}/salas`);
    return respuesta;
  }

}
