import { InjectionToken } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthModelLogin, UserAuthModel } from '../models/auth.model';
import { ResponseModelFakeStore } from '@core/models/in/responseFakeStore.model';

export const AUTH_REPOSITORY = new InjectionToken<IAuthRepository>('IAuthRepository');

/**
 * Contrato del repositorio de autenticación.
 * El servicio de auth implementa esta interfaz para centralizar el consumo de la API.
 */
export interface IAuthRepository {
    /**
     * Inicia sesión con las credenciales indicadas.
     * @param credentials Usuario, contraseña y opcionalmente userAgent
     * @param showLoader Si es true, muestra el loader durante la petición (por defecto false)
     */
    login(credentials: AuthModelLogin, showLoader?: boolean): Observable<ResponseModelFakeStore<UserAuthModel | null>>;
}
