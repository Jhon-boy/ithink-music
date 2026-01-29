import { AppConstant } from '@core/constantes/AppConstant';
import { AuthModelLogin, AuthResponseModel, UserAuthModel } from '@core/models/auth.model';
import { ResponseModelFakeStore } from '@core/models/in/responseFakeStore.model';
import { UserModel } from '@core/models/user.model';

/**
 * Clase que mapea los datos de API fake STORE
 */
export class FakeStoreMapper {

    /**
     * Mapa de respuesta exitosa para login. Arma UserAuthModel con user (desde credentials) y token (desde API).
     */
    static mapLoginSuccess(response: { token: string }, user: AuthModelLogin): ResponseModelFakeStore<UserAuthModel> {
        const userModel: UserModel = {
            id: 0,
            username: user.username,
            email: '',
            password: user.password,
        };
        const token: AuthResponseModel = { token: response.token as unknown as String };
        const data: UserAuthModel = { user: userModel, token };
        return new ResponseModelFakeStore<UserAuthModel>(
            true,
            AppConstant.CODIGO_OK,
            'LOGIN_OK',
            data
        );
    }
    /**
    * Mapa de respuesta de error para login. Code siempre string (ej. status o '99').
    */
    static mapLoginError(error: any): ResponseModelFakeStore<null> {
        const code = error?.status != null ? String(error.status) : '99';
        return new ResponseModelFakeStore<null>(
            false,
            code,
            error?.message ?? 'ERROR_LOGIN',
            null
        );
    }
}
