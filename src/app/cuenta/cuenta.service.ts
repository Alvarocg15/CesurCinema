import { Injectable } from "@angular/core";
import { BehaviorSubject } from 'rxjs';
import { Usuario } from "./interface/usuario.interface";
import { environment } from "../../enviroments/enviroment";
import { HttpClient } from "@angular/common/http";
import { CustomJwtPayload } from "../interface/CustomJwtPayload.interface";
import { AuthService } from "../services/auth-service.service";


@Injectable({
  providedIn: 'root'
})

export class CuentaService {

  private cuentaSource = new BehaviorSubject<Usuario[]>([]);
  currentUsuario = this.cuentaSource.asObservable();

  private serviceUrl = `${environment.apiUrl}/usuarios`;

  usuario!: CustomJwtPayload;


  constructor(private http: HttpClient, private authService: AuthService) { }

  getUsuario() {
    let idUser = this.authService.getUserId();
    let url = `${this.serviceUrl}/${idUser}`;
    let respuesta = this.http.get<Usuario[]>(url);
    return respuesta;
  }
  updateUsuario(usuario: Usuario[]) {
    let idUser = this.authService.getUserId();
    let url = `${environment.apiUrl}/usuario/${idUser}`;
    let respuesta = this.http.put<Usuario[]>(url, usuario);
    return respuesta;
  }
}
