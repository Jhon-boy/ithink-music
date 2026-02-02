import { InjectionToken } from "@angular/core";
import { ResponseModelFakeStore } from "@core/models/in/responseFakeStore.model";
import { RolModel } from "@core/models/rol_model";
import { Observable } from "rxjs";


export const ROL_REPOSITORY = new InjectionToken<IRolRepository>('IRolRepository');

/**
 * Contrato del repositorio de roles.
 */
export interface IRolRepository {
    /**
     * Obtiene los roles del usuario.
     * @param credential Id del usuario
     * @param token 
     * @param showLoader 
     */
    getRoles(credential: number, token: string, showLoader?: boolean): Observable<ResponseModelFakeStore<RolModel[] | null>>;
}