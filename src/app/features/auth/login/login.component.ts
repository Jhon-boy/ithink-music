import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { LoginService } from '../services/login_service';
import { AuthModelLogin, UserAuthModel } from '@core/models/auth.model';
import { ResponseModelFakeStore } from '@core/models/in/responseFakeStore.model';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
/**
 * Componente para el login de la aplicación
 */
export class LoginComponent {

  loginForm!: FormGroup;
  loading = false;
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private loginService: LoginService
  ) {
    this.initForm();
  }

  private initForm(): void {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  /**
   * Método para enviar el formulario de login
   * @returns 
   */
  submit(): void {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    const credentials: AuthModelLogin = {
      username: this.loginForm.value.username,
      password: this.loginForm.value.password,
      userAgent: navigator.userAgent
    };

    this.loading = true;
    this.errorMessage = '';

    this.loginService.login(credentials, true)
      .subscribe({
        next: (response: ResponseModelFakeStore<UserAuthModel | null>) => {
          const success = this.loginService.handleLoginSuccess(response);

          if (!success) {
            this.errorMessage = response.message || 'Credenciales inválidas';
          }
        },
        error: () => {
          this.errorMessage = 'Error inesperado al iniciar sesión';
        },
        complete: () => {
          this.loading = false;
        }
      });
  }
}
