import { Component } from '@angular/core';
import { CustomJwtPayload } from '../interface/CustomJwtPayload.interface';
import { AuthService } from '../services/auth-service.service';
import { CuentaService } from './cuenta.service';
import { Usuario } from './interface/usuario.interface';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { environment } from '../../enviroments/enviroment';

@Component({
  selector: 'app-cuenta',
  templateUrl: './cuenta.component.html',
  styleUrl: './cuenta.component.css'
})
export class CuentaComponent {
  usuario!: CustomJwtPayload;
  isLoading: Boolean = false;
  user: Usuario[] = [
    {
      user_id: 0,
      user_first_name: '',
      user_last_name: '',
      user_email: '',
      user_telefono: '',
      user_password: '',
      user_rol: ''
    }
  ];
  registerForm: FormGroup = new FormGroup({});

  constructor(private formBuilder: FormBuilder, private http: HttpClient, private snackBar: MatSnackBar,private authService: AuthService,
    private cuentaService: CuentaService) {
    this.registerForm = this.formBuilder.group({
      firstName: [this.user[0].user_first_name, Validators.required],
      secondLastName: [this.user[0].user_last_name, Validators.required],
      email: [this.user[0].user_email, [Validators.required, Validators.pattern('[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}')]],
      phone: [this.user[0].user_telefono, [Validators.required, Validators.pattern('^((6|7)\\s*)(\\d\\s*){8}\\b')]],
    });
  }

  ngOnInit() {
    this.isLoading = true;
    this.usuario = this.authService.decodedToken as CustomJwtPayload;
    this.cuentaService.getUsuario().subscribe((data) => {
      this.user = data;
      this.isLoading = false;
      if (this.user && this.user[0]) {
        this.buildForm();
      }
    });
  }


  buildForm() {
    this.registerForm.setValue({
      firstName: this.user[0].user_first_name,
      secondLastName: this.user[0].user_last_name,
      email: this.user[0].user_email,
      phone: this.user[0].user_telefono,
    });
  }

  logout() {
    this.authService.logout();
  }

  onSubmit() {
    if (this.registerForm.valid) {
      let formData = {
        user_first_name: this.registerForm.value.firstName,
        user_last_name: this.registerForm.value.secondLastName,
        user_email: this.registerForm.value.email,
        user_password: this.registerForm.value.password,
        user_telefono: this.registerForm.value.phone
      };
      let idUser = this.authService.getUserId();

      this.http.put(`${environment.apiUrl}/usuario/${idUser}`, formData, { observe: 'response', responseType: 'text' }).subscribe(
        response => {
          // Si el estado de la respuesta es 201, significa que el usuario se editó correctamente
          if (response.status === 200) {
            location.reload();
            this.snackBar.open('Usuario editado correctamente', 'Cerrar', {
              duration: 3000,
              horizontalPosition: 'right',
            });
          }
        },
        error => {
          // Si el estado de la respuesta es 400, significa que hubo un error durante la edición del usuario
          if (error.status === 400) {
            this.snackBar.open('Error durante la edición del usuario', 'Cerrar', {
              duration: 3000,
              horizontalPosition: 'right'
            });
          } else {
            // Imprime el error en la consola
            console.error(error);
          }
        }
      );
    }
  }
}
