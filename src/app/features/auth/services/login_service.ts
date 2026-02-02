import { Injectable, Inject } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthModelLogin, UserAuthModel } from '@core/models/auth.model';
import { ResponseModelFakeStore } from '@core/models/in/responseFakeStore.model';
import { AUTH_REPOSITORY, IAuthRepository } from '@core/repository/auth_repository';
import { SesionService } from './sesion_service';
import { AuthStateService } from './auth_state_service';
import { RolService } from '@core/services/rol_service';
import { IRolRepository, ROL_REPOSITORY } from '@core/repository/rol_repository';

/**
 * Servicio para el login de la aplicación
 */
@Injectable({
    providedIn: 'root'
})
export class LoginService {

    constructor(
        @Inject(AUTH_REPOSITORY) private authRepository: IAuthRepository,
        private sessionService: SesionService,
        private authStateService: AuthStateService,
        @Inject(ROL_REPOSITORY) private rolRepository: IRolRepository
    ) { }
    // Inicia sesión con las credenciales indicadas
    login(credentials: AuthModelLogin, showLoader = true): Observable<ResponseModelFakeStore<UserAuthModel | null>> {
        return this.authRepository.login(credentials, showLoader);
    }
    handleLoginSuccess(response: ResponseModelFakeStore<UserAuthModel | null>): boolean {
        if (!response.success || !response.data) {
            return false;
        }

        const sesionState = {
            isLoggedIn: true,
            user: response.data,
            loginTime: Date.now(),
            roles: [],
        };

        // Actualizar tanto SesionService (localStorage) como AuthStateService (signals)
        this.sessionService.set(sesionState);
        this.authStateService.login(sesionState);
        this.loadRoles(response.data.user.id, response.data.token.token.toString());

        return true;
    }

    private loadRoles(userId: number, token: string): void {
        this.rolRepository.getRoles(userId, token, true).subscribe({
            next: (response) => {
                if (response.success && response.data) {
                    this.authStateService.setRoles(response.data);
                }
            }
        });
    }
}