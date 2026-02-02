import { InjectionToken } from "@angular/core";
import { ResponseModelFakeStore } from "@core/models/in/responseFakeStore.model";
import { ProductModel } from "@core/models/product_model";
import { Observable } from "rxjs";


export const PRODUCT_REPOSITORY = new InjectionToken<IProductRepository>('IProductRepository');

export interface IProductRepository {
    /**
     * Obtiene los productos
     * @param credential 
     * @param token 
     * @param showLoader 
     */
    getProducts(credential: number, token: string, showLoader?: boolean): Observable<ResponseModelFakeStore<ProductModel[] | null>>;

    /**
     * Obtiene un producto por su id
     * @param id 
     * @param token 
     * @param showLoader 
     */
    getProductById(id: number, token: string, showLoader?: boolean): Observable<ResponseModelFakeStore<ProductModel | null>>;

    /**
     * Crea un nuevo producto
     * @param product 
     * @param token 
     * @param showLoader 
     */
    createProduct(product: ProductModel, token: string, showLoader?: boolean): Observable<ResponseModelFakeStore<ProductModel | null>>;

    /**
     * Actualiza un producto existente
     * @param product 
     * @param token 
     * @param showLoader 
     */
    updateProduct(product: ProductModel, token: string, showLoader?: boolean): Observable<ResponseModelFakeStore<ProductModel | null>>;
    /**
     * Elimina un producto existente
     * @param id 
     * @param token 
     * @param showLoader 
     */
    deleteProduct(id: number, token: string, showLoader?: boolean): Observable<ResponseModelFakeStore<ProductModel | null>>;
}