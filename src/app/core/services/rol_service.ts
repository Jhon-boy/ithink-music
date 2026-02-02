import { Injectable } from "@angular/core";
import { IRolRepository } from "@core/repository/rol_repository";
import { HttpService } from "./http_service";
import { Observable, of } from "rxjs";
import { ResponseModelFakeStore } from "@core/models/in/responseFakeStore.model";
import { RolModel } from "@core/models/rol_model";
import { getRolesByIdMock } from "@core/mock/rol_mock";



@Injectable({
    providedIn: 'root'
})
export class RolService implements IRolRepository {
    constructor(private http: HttpService) { }
    getRoles(credential: number, token: string, showLoader?: boolean): Observable<ResponseModelFakeStore<RolModel[] | null>> {
        return of(getRolesByIdMock(credential));
    }
}