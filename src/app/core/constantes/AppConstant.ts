import { environment } from "src/enviroments/enviroments";

export const AppConstant = {
    CODIGO_OK: 'OK',
    ERROR_LOGIN_401: 'Usuario o contraseña incorrectos',
    LOGIN_URL: `${environment.fakeStoreUrlBase}/auth/login`,
    GET_USER_BY_ID: `${environment.fakeStoreUrlBase}/users/`,
    PRODUCTS_URL: `${environment.fakeStoreUrlBase}/products`,

    KEY: 'APP_SESSION',
    SESION_TTL: 30 * 60 * 1000,

    ID_USER: 1,
}