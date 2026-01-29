import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { AppConstant } from '@core/constantes/AppConstant';
import { FakeStoreMapper } from '@core/mappers/fakeStoreMapper';
import { AuthModelLogin, UserAuthModel } from '@core/models/auth.model';
import { ResponseModelFakeStore } from '@core/models/in/responseFakeStore.model';
import { IAuthRepository } from '@core/repository/auth_repository';
import { HttpService } from './http_service';


/**
 * Servicio para la autenticación
 */
@Injectable({
    providedIn: 'root'
})
export class AuthService implements IAuthRepository {

    constructor(private http: HttpService) { }
    login(credentials: AuthModelLogin, showLoader?: boolean): Observable<ResponseModelFakeStore<UserAuthModel | null>> {

        return this.http.post<{ token: string }>(AppConstant.LOGIN_URL, credentials, undefined, showLoader)
            .pipe(
                map(resp => FakeStoreMapper.mapLoginSuccess(resp, credentials)),
                catchError(err => of(FakeStoreMapper.mapLoginError(err)))
            );
    }

}