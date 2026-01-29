import { Injectable, Inject } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthModelLogin, UserAuthModel } from '@core/models/auth.model';
import { ResponseModelFakeStore } from '@core/models/in/responseFakeStore.model';
import { AUTH_REPOSITORY, IAuthRepository } from '@core/repository/auth_repository';
import { SesionService } from './sesion_service';

/**
 * Servicio para el login de la aplicación
 */
@Injectable({
    providedIn: 'root'
})
export class LoginService {

    constructor(
        @Inject(AUTH_REPOSITORY) private authRepository: IAuthRepository,
        private sessionService: SesionService
    ) { }
    // Inicia sesión con las credenciales indicadas
    login(credentials: AuthModelLogin, showLoader = true): Observable<ResponseModelFakeStore<UserAuthModel | null>> {
        return this.authRepository.login(credentials, showLoader);
    }
    handleLoginSuccess(response: ResponseModelFakeStore<UserAuthModel | null>): boolean {
        if (!response.success || !response.data) {
            return false;
        }

        this.sessionService.set({
            isLoggedIn: true,
            user: response.data,
            loginTime: Date.now()
        });
        return true;
    }
}