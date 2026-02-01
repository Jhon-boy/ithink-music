import { inject } from "@angular/core";
import { CanActivateFn, Router } from "@angular/router";
import { AuthStateService } from "../services/auth_state_service";


/**
 * Guard para proteger rutas que requieren autenticación
 * @returns boolean
 */
export const loginGuard: CanActivateFn = () => {
    const authState = inject(AuthStateService);
    const router = inject(Router);

    if (authState.isLoggedIn$()) {
        router.navigate(['/']);
        return false;
    }

    return true;
}