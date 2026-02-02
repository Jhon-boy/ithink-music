import { computed, Injectable, signal } from "@angular/core";
import { SesionState } from "../model/sesion_state";
import { SesionService } from "./sesion_service";
import { RolModel } from "@core/models/rol_model";

@Injectable({
    providedIn: 'root'
})
export class AuthStateService {
    private sesionSignal = signal<SesionState | null>(null);
    sesion$ = this.sesionSignal.asReadonly();

    isLoggedIn$ = computed(() => !!this.sesionSignal()?.isLoggedIn);

    user$ = computed(() => this.sesionSignal()?.user?.user ?? null);

    /**
     * Rol activo del usuario
     */
    activeRol$ = computed<RolModel | null>(() =>
        this.sesionSignal()?.activeRol ?? null
    );

    /** (opcional) todos los roles */
    roles$ = computed(() => this.sesionSignal()?.roles ?? []);

    constructor(private sesionService: SesionService) {
        this.loadFromStorage();
    }

    /**
     * Carga de LOCAL STORAGE informacion
     */
    private loadFromStorage() {
        const state = this.sesionService.get();
        this.sesionSignal.set(state);
    }

    /**
     * Logea en la aplicacion
     * @param state 
     */
    login(state: SesionState) {
        this.sesionService.set(state);
        this.sesionSignal.set(state);
    }


    /**
     * Sale de la aplicacion limpiando sesion de todo
     */
    logout() {
        this.sesionService.clear();
        this.sesionSignal.set(null);
    }

    /**
     * Guarda los roles
     * @param roles 
     */
    setRoles(roles: RolModel[]) {
        this.sesionSignal.update(state => {
            if (!state) return state;

            const newState: SesionState = {
                ...state,
                roles,
                activeRol: state.activeRol ?? roles[0]
            };

            this.persist(newState);
            return newState;
        });
    }
    /**
     * Guardar y actualizar cuando el usuario actualice los ROLES
     * @param role 
     */

    setActiveRole(role: RolModel) {
        this.sesionSignal.update(state => {
            if (!state) return state;

            const newState = { ...state, activeRol: role };
            this.persist(newState);
            return newState;
        });
    }

    private persist(state: SesionState) {
        this.sesionService.set(state);
        this.sesionSignal.set(state);
    }

}