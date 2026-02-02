import { RolModel } from "./rol_model";

/**
 * Modelo para el Usuario de la API
 */
export interface UserModel {
    id: number;
    username: String;
    email: String;
    password: String;
}