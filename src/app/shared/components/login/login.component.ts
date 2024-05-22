import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { environment } from '../../../../enviroments/enviroment';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { MatDialogRef } from '@angular/material/dialog';
import { CustomJwtPayload } from '../../../interface/CustomJwtPayload.interface';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent {
  loginForm: FormGroup;
  rememberMe = false;
  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private snackBar: MatSnackBar,
    private router: Router,
    public dialogRef: MatDialogRef<LoginComponent>,
  ) {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(8)]],
      rememberMe: [false],
    });

    const rememberMeControl = this.loginForm.get('rememberMe');
    if (rememberMeControl) {
      rememberMeControl.valueChanges.subscribe((remember) => {
        this.rememberMe = remember;
      });
    }
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const formData = this.loginForm.value;

      this.http.post<any>(`${environment.apiUrl}/login`, formData).subscribe(
        (response) => {
          if (response && response.token) {
            this.dialogRef.close();
            // Decodificar el token
            const decodedToken = jwtDecode<CustomJwtPayload>(response.token);
            console.log("Decoded token"+JSON.stringify(decodedToken));
            // Verificar el rol del usuario
            if (decodedToken.authorities.includes('ROLE_ADMIN')) {
              // Si el usuario es un administrador, redirigir a /administracion
              console.log("Por que no va 1");
              this.router.navigate(['/administracion']);
            } else {
              // Si el usuario no es un administrador, redirigir a /cuenta
              console.log("Por que no va 2");
              this.router.navigate(['/cuenta']);
            }

            if (this.rememberMe) {
              localStorage.setItem('token', response.token);
            } else {
              sessionStorage.setItem('token', response.token);
            }

            this.snackBar.open('Inicio de sesión exitoso', 'Cerrar', {
              duration: 3000,
              horizontalPosition: 'right',
            });
          }
        },
        (error) => {
          if (error.status === 401) {
            this.snackBar.open('Usuario o contraseña incorrectos', 'Cerrar', {
              duration: 3000,
              horizontalPosition: 'right',
            });
          }
        }
      );
    }
  }
}
