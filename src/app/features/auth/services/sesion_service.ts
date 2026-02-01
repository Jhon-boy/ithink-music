import { Injectable } from "@angular/core";
import { SesionState } from "@features/auth/model/sesion_state";
import { AppConstant } from "@core/constantes/AppConstant";

@Injectable({
    providedIn: 'root'
})
/**
 * Servicio para la gestión de la sesión de la aplicación
 */
export class SesionService {


    // Setea el estado de la sesión
    set(state: SesionState): void {
        localStorage.setItem(AppConstant.KEY, JSON.stringify(state));
    }

    // Obtiene el estado de la sesión
    get(): SesionState | null {
        const raw = localStorage.getItem(AppConstant.KEY);
        if (!raw) return null;

        const state: SesionState = JSON.parse(raw);

        if (this.isExpired(state)) {
            this.clear();
            return null;
        }

        return state;
    }

    // Elimina el estado de la sesión
    clear(): void {
        localStorage.removeItem(AppConstant.KEY);
    }

    // Verifica si la sesión ha expirado
    private isExpired(state: SesionState): boolean {
        return Date.now() - state.loginTime > AppConstant.SESION_TTL;
    }
}