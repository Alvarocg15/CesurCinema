import { Injectable } from '@angular/core';
import { DialogComponent } from '../dialog/dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../../services/auth-service.service';
import { environment } from '../../../../enviroments/enviroment';
import { Usuario } from '../../../cuenta/interface/usuario.interface';

@Injectable({
  providedIn: 'root'
})
export class HeaderService {

  private serviceUrl = `${environment.apiUrl}/usuarios`;

  constructor(public dialog: MatDialog,private http: HttpClient, private authService: AuthService) { }

  getUsuario() {
    let idUser = this.authService.getUserId();
    let url = `${this.serviceUrl}/${idUser}`;
    let respuesta = this.http.get<Usuario[]>(url);
    return respuesta;
  }

  openDialog() {
    let dialogRef;

    dialogRef = this.dialog.open(DialogComponent, {
      maxWidth: '100vW',
      height: '80%',
      width: '100%',
      position: { bottom: '0px' },
    });
  }

  closeDialog() {
    this.dialog.closeAll();
  }

}
