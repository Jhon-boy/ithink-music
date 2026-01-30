import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthStateService } from '@features/auth/services/auth_state_service';
import { SesionService } from '@features/auth/services/sesion_service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

  auth = inject(AuthStateService);
  user = this.auth.user$;
  router = inject(Router);
  /**
   * Cierra la sesión del usuario
   */
  logout() {
    this.auth.logout();
    this.router.navigate(['/login']);
  }
}
