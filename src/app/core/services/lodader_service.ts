import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

/**
 * Servicio para el manejo de loader de la aplicacion cuando existe una acction y sea bloqueada toda accion hasta que se complete la accion.
 */
@Injectable({
    providedIn: 'root', // Para que este disponible en toda la aplicacion
})
export class LoaderService {

    private loadingSubject = new BehaviorSubject<boolean>(false);
    loading$ = this.loadingSubject.asObservable();

    // Muestra el Loader
    show(): void {
        this.loadingSubject.next(true);
    }

    // Oculta el Loader
    hide(): void {
        this.loadingSubject.next(false);
    }

}