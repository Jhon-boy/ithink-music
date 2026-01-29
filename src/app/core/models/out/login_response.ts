/**
 * Modelo del payload de login cuando success = true.
 * Sigue el mismo formato: es el tipo de "data" dentro de ResponseModelFakeStore.
 */
export class LoginResponseModel {
    token!: string;

    constructor(token: string) {
        this.token = token;
    }
}