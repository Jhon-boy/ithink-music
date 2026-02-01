

/**
 * Servicio para el manejo de usuarios
 */

import { Inject, Injectable } from "@angular/core";
import { AppConstant } from "@core/constantes/AppConstant";
import { UserFullModel } from "@core/models/auth.model";
import { ResponseModelFakeStore } from "@core/models/in/responseFakeStore.model";
import { AUTH_REPOSITORY, IAuthRepository } from "@core/repository/auth_repository";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class UserService {

    constructor(
        @Inject(AUTH_REPOSITORY) private authRepository: IAuthRepository
    ) {

    }
    /**
     * Obtiene el usuario actual
     * @param showLoader Indica si se debe mostrar el loader
     * @returns Observable<ResponseModelFakeStore<UserFullModel | null>>
     */
    getUser(showLoader = true)
        : Observable<ResponseModelFakeStore<UserFullModel | null>> {
        return this.authRepository.getUser(AppConstant.ID_USER, showLoader);
    }
}