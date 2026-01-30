import { Injectable, signal } from "@angular/core";
import { AppModuleTab } from "@core/models/app_module_tab";
/**
 * Servicio para registrar los módulos de la aplicación
 */
@Injectable({
    providedIn: 'root'
})
export class ModuleRegistreService {

    private modulesSignal = signal<AppModuleTab[]>([]);
    modules$ = this.modulesSignal.asReadonly();


    /**
     * Registra un módulo en la aplicación
     * @param module - El módulo a registrar
     */
    register(module: AppModuleTab) {
        this.modulesSignal.update(list => [...list, module]);
    }
}