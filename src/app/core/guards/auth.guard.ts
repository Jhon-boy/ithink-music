import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { SesionService } from '@features/auth/services/sesion_service';

export const authGuard: CanActivateFn = () => {
  const session = inject(SesionService);
  const router = inject(Router);
  if (session.get() !== null) {
    return true;
  }
  return router.createUrlTree(['/login']);
};
