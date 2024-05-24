import { Injectable } from "@angular/core";
import { BehaviorSubject } from 'rxjs';
import { environment } from "../../../enviroments/enviroment";
import { HttpClient } from "@angular/common/http";
import { CustomJwtPayload } from "../..//interface/CustomJwtPayload.interface";
import { AuthService } from "../..//services/auth-service.service";
import { Entrada } from "../../entradas/interface/entrada.interface";


@Injectable({
  providedIn: 'root'
})

export class EntradasService {

  private entradasSource = new BehaviorSubject<Entrada[]>([]);
  currentEntrada = this.entradasSource.asObservable();

  private serviceUrl = `${environment.apiUrl}/entradasByUser`;

  usuario!: CustomJwtPayload;


  constructor(private http: HttpClient, private authService: AuthService) { }

  getEntradasByUser() {
    let idUser = this.authService.getUserId();
    let url = `${this.serviceUrl}/${idUser}`;
    let respuesta = this.http.get<Entrada[]>(url);
    return respuesta;
  }
}
