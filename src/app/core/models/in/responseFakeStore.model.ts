
/**
 * Modelo de respuesta de la API de Fake Store.
 * Mismo formato para éxito y error: success, code, message, data (tipado).
 * @template T Tipo del payload en data (ej. LoginResponseModel o null en error).
 */
export class ResponseModelFakeStore<T> {
    success!: boolean;
    code!: string;
    message!: string;
    data!: T;

    constructor(success: boolean, code: string, message: string, data: T) {
        this.success = success;
        this.code = code;
        this.message = message;
        this.data = data;
    }
}