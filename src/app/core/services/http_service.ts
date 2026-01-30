import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { LoaderService } from "./lodader_service";
import { catchError, finalize, Observable, throwError, timeout } from "rxjs";
import { environment } from "src/enviroments/enviroments";
import { LoginService } from "@features/auth/services/login_service";
import { LogService } from "./log_service";


/**
 * Servicio para las peticiones HTTP
 */
@Injectable({
    providedIn: 'root',
})
export class HttpService {


    // Constructor de todos los servicios que usaremos
    constructor(private http: HttpClient,
        private loaderService: LoaderService,
        private logService: LogService
    ) { }

    /**
     * Metodo para obtener un recurso
     * @param url 
     * @param params 
     * @param showLoader 
     * @returns 
     */
    get<T>(url: string, params?: Record<string, any>, showLoader: boolean = false): Observable<T> {
        try {
            if (showLoader) {
                this.loaderService.show();
            }
            let httpParams = new HttpParams();
            if (params) {
                Object.keys(params).forEach(key => {
                    if (params[key] !== undefined && params[key] !== null) {
                        httpParams = httpParams.append(key, params[key]);
                    }
                });
            }
            return this.http.get<T>(url, { params: httpParams }).pipe(timeout(environment.timeOut)).pipe(
                catchError(error => {
                    this.logService.error('Error en la peticion HTTP', error);
                    return throwError(() => error);
                }), finalize(() => {
                    this.loaderService.hide();
                })
            )

        } catch (error) {
            this.logService.error('GET TRY/CATCH ERROR:', error);
            return throwError(() => error);
        } finally {
            this.loaderService.hide();
        }
    }

    /**
     * Metodo para crear un recurso
     * @param url 
     * @param body 
     * @param showLoader 
     * @returns 
     */
    post<T>(
        url: string,
        body: any,
        params?: Record<string, any>,
        showLoader: boolean = false
    ): Observable<T> {

        try {
            if (showLoader) {
                this.loaderService.show();
            }
            let httpParams = new HttpParams();
            if (params) {
                Object.keys(params).forEach(key => {
                    if (params[key] !== undefined && params[key] !== null) {
                        httpParams = httpParams.append(key, params[key]);
                    }
                });
            }

            return this.http.post<T>(url, body, { params: httpParams }).pipe(timeout(environment.timeOut)).pipe(
                catchError(error => {
                    this.logService.error('HTTP POST ERROR:', error);
                    return throwError(() => error);
                }),
                finalize(() => {
                    if (showLoader) {
                        this.loaderService.hide();
                    }
                })
            );

        } catch (error) {
            this.logService.error('POST TRY/CATCH ERROR:', error);
            return throwError(() => error);
        } finally {
            this.loaderService.hide();
        }
    }

    /**
     * Metodo para actualizar un recurso
     * @param url 
     * @param body 
     * @param showLoader 
     * @returns 
     */
    put<T>(
        url: string,
        body: any,
        params?: Record<string, any>,
        showLoader: boolean = false
    ): Observable<T> {

        try {
            if (showLoader) {
                this.loaderService.show();
            }
            let httpParams = new HttpParams();
            if (params) {
                Object.keys(params).forEach(key => {
                    if (params[key] !== undefined && params[key] !== null) {
                        httpParams = httpParams.append(key, params[key]);
                    }
                });
            }
            return this.http.put<T>(url, body, { params: httpParams }).pipe(timeout(environment.timeOut)).pipe(
                catchError(error => {
                    this.logService.error('HTTP PUT ERROR:', error);
                    return throwError(() => error);
                }),
                finalize(() => {
                    if (showLoader) {
                        this.loaderService.hide();
                    }
                })
            );

        } catch (error) {
            this.logService.error('PUT TRY/CATCH ERROR:', error);
            return throwError(() => error);
        } finally {
            this.loaderService.hide();
        }
    }


    /**
     * Metodo para eliminar un recurso
     * @param url 
     * @param showLoader 
     * @returns 
     */
    delete<T>(
        url: string,
        params?: Record<string, any>,
        showLoader: boolean = false
    ): Observable<T> {

        try {
            if (showLoader) {
                this.loaderService.show();
            }
            let httpParams = new HttpParams();
            if (params) {
                Object.keys(params).forEach(key => {
                    if (params[key] !== undefined && params[key] !== null) {
                        httpParams = httpParams.append(key, params[key]);
                    }
                });
            }
            return this.http.delete<T>(url, { params: httpParams }).pipe(timeout(environment.timeOut)).pipe(
                catchError(error => {
                    this.logService.error('DELETE ERROR:', error);
                    return throwError(() => error);
                }),
                finalize(() => {
                    if (showLoader) {
                        this.loaderService.hide();
                    }
                })
            );

        } catch (error) {
            this.logService.error('DELETE TRY/CATCH ERROR:', error);
            return throwError(() => error);
        } finally {
            this.loaderService.hide();
        }
    }
}
