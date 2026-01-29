import { UserModel } from "./user.model";

/**
 * Modelo para la Autenticación de la API
 */
export interface AuthModelLogin {
    username: String;
    password: String;
    userAgent: String;
}
/**
 * Modelo para la respuesta de la Autenticación de la API
 */
export interface AuthResponseModel {
    token: String;
}

/**
 * Modelo para el Usuario Autenticado de la API
 */
export interface UserAuthModel {
    user: UserModel;
    token: AuthResponseModel;
}