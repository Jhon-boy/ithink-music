import { AppConstant } from '@core/constantes/AppConstant';
import { AuthModelLogin, AuthResponseModel, UserAuthModel, UserFullModel } from '@core/models/auth.model';
import { ProductModel } from '@core/models/product_model';
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
        let menssage = '';
        if (code === '401') {
            menssage = AppConstant.ERROR_LOGIN_401;
        } else {
            menssage = error?.message ?? 'ERROR_LOGIN';
        }
        return new ResponseModelFakeStore<null>(
            false,
            code,
            menssage,
            null
        );
    }
    static mapUserSuccess(response: UserFullModel): ResponseModelFakeStore<UserFullModel> {
        return new ResponseModelFakeStore<UserFullModel>(
            true,
            AppConstant.CODIGO_OK,
            'USER_OK',
            response
        );
    }

    /**
     * Mapa de respuesta exitosa para un producto (get, create, update).
     */
    static mapProductSuccess(response: ProductModel): ResponseModelFakeStore<ProductModel> {
        return new ResponseModelFakeStore<ProductModel>(
            true,
            AppConstant.CODIGO_OK,
            'PRODUCT_OK',
            response
        );
    }

    /**
     * Mapa de respuesta exitosa para lista de productos.
     */
    static mapProductsSuccess(response: ProductModel[]): ResponseModelFakeStore<ProductModel[]> {
        return new ResponseModelFakeStore<ProductModel[]>(
            true,
            AppConstant.CODIGO_OK,
            'PRODUCTS_OK',
            Array.isArray(response) ? response : []
        );
    }

    /**
     * Mapa de respuesta exitosa para delete (sin data).
     */
    static mapProductDeleteSuccess(): ResponseModelFakeStore<null> {
        return new ResponseModelFakeStore<null>(true, AppConstant.CODIGO_OK, 'PRODUCT_DELETED', null);
    }

    /**
     * Mapa de respuesta de error para productos. Code siempre string.
     */
    static mapProductError(error: any): ResponseModelFakeStore<null> {
        const code = error?.status != null ? String(error.status) : '99';
        const message = error?.message ?? 'ERROR_PRODUCT';
        return new ResponseModelFakeStore<null>(false, code, message, null);
    }
}
