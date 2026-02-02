import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppConstant } from '@core/constantes/AppConstant';
import { ResponseModelFakeStore } from '@core/models/in/responseFakeStore.model';
import { ProductModel } from '@core/models/product_model';
import { ProductService } from '@core/services/product_service';
import { AuthStateService } from '@features/auth/services/auth_state_service';

/**
 * Controlador para los productos. Obtiene el token de la sesión actual en cada llamada.
 */
@Injectable({
  providedIn: 'root',
})
export class ProductController {
  private auth = inject(AuthStateService);
  private productService = inject(ProductService);

  /**
   * Token actual de la sesión (se lee en cada llamada para no quedarse con valor antiguo).
   */
  private getToken(): string {
    const session = this.auth.sesion$();
    const token = session?.user?.token;
    return token != null ? String(token.token ?? '') : '';
  }

  /**
   * Obtiene los productos.
   * @param showLoader Indica si se debe mostrar el loader (por defecto true).
   */
  getProducts(showLoader = true): Observable<ResponseModelFakeStore<ProductModel[] | null>> {
    const token = this.getToken();
    return this.productService.getProducts(AppConstant.ID_USER, token, showLoader);
  }

  getProductById(id: number, showLoader = true): Observable<ResponseModelFakeStore<ProductModel | null>> {
    const token = this.getToken();
    return this.productService.getProductById(id, token, showLoader);
  }

  createProduct(product: ProductModel, showLoader = true): Observable<ResponseModelFakeStore<ProductModel | null>> {
    const token = this.getToken();
    return this.productService.createProduct(product, token, showLoader);
  }

  updateProduct(product: ProductModel, showLoader = true): Observable<ResponseModelFakeStore<ProductModel | null>> {
    const token = this.getToken();
    return this.productService.updateProduct(product, token, showLoader);
  }

  deleteProduct(id: number, showLoader = true): Observable<ResponseModelFakeStore<ProductModel | null>> {
    const token = this.getToken();
    return this.productService.deleteProduct(id, token, showLoader);
  }
}
