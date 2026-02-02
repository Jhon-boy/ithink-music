import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { AppConstant } from '@core/constantes/AppConstant';
import { FakeStoreMapper } from '@core/mappers/fakeStoreMapper';
import { ProductModel } from '@core/models/product_model';
import { ResponseModelFakeStore } from '@core/models/in/responseFakeStore.model';
import { IProductRepository } from '@core/repository/product_repository';
import { HttpService } from './http_service';

/**
 * Servicio para obtener los productos
 */
@Injectable({
  providedIn: 'root',
})
export class ProductService implements IProductRepository {
  constructor(private http: HttpService) {}

  getProductById(id: number, token: string, showLoader?: boolean): Observable<ResponseModelFakeStore<ProductModel | null>> {
    return this.http.get<ProductModel>(`${AppConstant.PRODUCTS_URL}/${id}`, {}, showLoader).pipe(
      map(resp => FakeStoreMapper.mapProductSuccess(resp)),
      catchError(err => of(FakeStoreMapper.mapProductError(err)))
    );
  }

  createProduct(product: ProductModel, token: string, showLoader?: boolean): Observable<ResponseModelFakeStore<ProductModel | null>> {
    return this.http.post<ProductModel>(`${AppConstant.PRODUCTS_URL}`, product, {}, showLoader).pipe(
      map(resp => FakeStoreMapper.mapProductSuccess(resp)),
      catchError(err => of(FakeStoreMapper.mapProductError(err)))
    );
  }

  updateProduct(product: ProductModel, token: string, showLoader?: boolean): Observable<ResponseModelFakeStore<ProductModel | null>> {
    return this.http.put<ProductModel>(`${AppConstant.PRODUCTS_URL}/${product.id}`, product, {}, showLoader).pipe(
      map(resp => FakeStoreMapper.mapProductSuccess(resp)),
      catchError(err => of(FakeStoreMapper.mapProductError(err)))
    );
  }

  deleteProduct(id: number, token: string, showLoader?: boolean): Observable<ResponseModelFakeStore<ProductModel | null>> {
    return this.http.delete<void>(`${AppConstant.PRODUCTS_URL}/${id}`, {}, showLoader).pipe(
      map(() => FakeStoreMapper.mapProductDeleteSuccess()),
      catchError(err => of(FakeStoreMapper.mapProductError(err)))
    );
  }

  getProducts(credential: number, token: string, showLoader?: boolean): Observable<ResponseModelFakeStore<ProductModel[] | null>> {
    return this.http.get<ProductModel[]>(`${AppConstant.PRODUCTS_URL}`, {}, showLoader).pipe(
      map(resp => FakeStoreMapper.mapProductsSuccess(resp)),
      catchError(err => of(FakeStoreMapper.mapProductError(err)))
    );
  }
}
