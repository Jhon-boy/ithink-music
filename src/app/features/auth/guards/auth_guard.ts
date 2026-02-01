import { Inject, inject } from "@angular/core"
import { SesionService } from "../services/sesion_service"
import { CanActivateFn, Router } from "@angular/router";


/**
 * Guard para proteger rutas que requieren autenticación
 * @returns boolean
 */
export const authGuard: CanActivateFn = () => {

    const sessionService = inject(SesionService);
    const router = Inject(Router);

    const session = sessionService.get();
    if (!session || !session.isLoggedIn) {
        router.navigate(['/login']);
        return false;
    }

    return true;
}