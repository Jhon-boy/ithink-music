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
    private activeSignal = signal<AppModuleTab | null>(null);

    modules$ = this.modulesSignal.asReadonly();
    active$ = this.activeSignal.asReadonly();


    /**
     * Registra un módulo en la aplicación
     * @param module - El módulo a registrar
     */
    register(module: AppModuleTab) {
        this.modulesSignal.update(list => [...list, module]);

        if (!this.activeSignal()) {
            this.activeSignal.set(module);
        }
    }

    /**
     * Activa un módulo
     * @param id - El id del módulo a activar
     */
    activate(id: string) {
        const module = this.modulesSignal().find(m => m.id === id);
        if (module) this.activeSignal.set(module);
    }

    /**
     * Establece el módulo activo
     * @param module - El módulo a establecer como activo
     */
    setActive(module: AppModuleTab) {
        this.activeSignal.set(module);
    }
}