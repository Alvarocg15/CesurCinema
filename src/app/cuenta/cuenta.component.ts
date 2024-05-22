import { Component } from '@angular/core';
import { CustomJwtPayload } from '../interface/CustomJwtPayload.interface';
import { AuthService } from '../services/auth-service.service';
import { CuentaService } from './cuenta.service';
import { Usuario } from './interface/usuario.interface';

@Component({
  selector: 'app-cuenta',
  templateUrl: './cuenta.component.html',
  styleUrl: './cuenta.component.css'
})
export class CuentaComponent {
  usuario!: CustomJwtPayload;
  isLoading: Boolean = false;
  user: Usuario[] = [];


  constructor(
    private authService: AuthService,
    private cuentaService: CuentaService
  ) { }

  ngOnInit() {
    this.isLoading = true;
    this.usuario = this.authService.decodedToken as CustomJwtPayload;
    this.cuentaService.getUsuario().subscribe((data) => {
      this.user = data;
      console.log(this.user);
      this.isLoading = false;
    });
  }

  logout() {
    this.authService.logout();
  }
}
