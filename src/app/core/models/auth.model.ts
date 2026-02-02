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

/**
 * Modelo para el Usuario Autenticado de la API
 */
export interface UserFullModel extends UserModel {
  phone: string;
  address: Address;
  name: Name;
  __v: number;
}
/**
 * Modelo para la dirección del usuario
 */
export interface Address {
  city: string;
  street: string;
  number: number;
  zipcode: string;
  geolocation: GeoLocation;
}

export interface GeoLocation {
  lat: string;
  long: string;
}

export interface Name {
  firstname: string;
  lastname: string;
}
