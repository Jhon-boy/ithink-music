import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthModelLogin, UserAuthModel } from '@core/models/auth.model';
import { ResponseModelFakeStore } from '@core/models/in/responseFakeStore.model';
import { DiologService } from '@shared/dialogs/service/dialog.service';
import { LoginService } from '../services/login_service';
import { ButtonsComponent } from '@shared/buttons/buttons.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, ButtonsComponent],
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
    private loginService: LoginService,
    private router: Router,
    private dialogService: DiologService
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
   * Callback para el botón (arrow function para conservar this)
   */
  onSubmit = (): void => {
    this.submit();
  };

  /**
   * Método para enviar el formulario de login
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

          if (success) {
            this.router.navigate(['/home']);
          } else {
            this.dialogService.error(
              response.message || 'Credenciales inválidas',
              undefined,
              true
            );
          }
        },
        error: () => {
          this.dialogService.error(
            'Error inesperado al iniciar sesión. Revisa tu conexión.',
            undefined,
            true
          );
        },
        complete: () => {
          this.loading = false;
        }
      });
  }
}
