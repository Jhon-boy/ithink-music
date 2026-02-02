import { CommonModule } from '@angular/common';
import { Component, computed, HostListener, inject, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { RolModel } from '@core/models/rol_model';
import { AuthStateService } from '@features/auth/services/auth_state_service';
import { SesionService } from '@features/auth/services/sesion_service';
import { ButtonsComponent } from '@shared/buttons/buttons.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterLink, ButtonsComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  // Header component for displaying user info and logout

  private auth = inject(AuthStateService);
  private router = inject(Router);

  open = signal(false);

  user = this.auth.user$;
  roles = this.auth.roles$;
  activeRole = this.auth.activeRol$;
  loginTime = computed(() => this.auth.sesion$()?.loginTime ?? null);
  loginTimeFormatted = computed(() => {
    const time = this.loginTime();
    if (!time) return '--:--:--';
    const date = new Date(time);
    return date.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
  });
  elapsedTime = signal('00:00:00');

  constructor() {
    setInterval(() => {
      const start = this.loginTime();
      if (!start) return;

      const diff = Date.now() - start;
      this.elapsedTime.set(this.format(diff));
    }, 1000);
  }

  /**
   * Cierra la sesión del usuario
   */
  logout() {
    this.auth.logout();
    this.router.navigate(['/login']);
  }

  /**
   * Cambia de estado
   */
  toggleMenu() {
    this.open.update(v => !v);
  }

  /**
   * Cierra el menú al hacer clic fuera
   */
  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    if (!this.open()) return;
    
    const target = event.target as HTMLElement;
    const userWrapper = target.closest('.user-wrapper');
    const userDropdown = target.closest('.user-dropdown');
    const userTrigger = target.closest('.user-trigger');
    
    // Solo cerrar si el clic fue fuera del wrapper, dropdown y trigger
    if (!userWrapper && !userDropdown && !userTrigger) {
      this.open.set(false);
    }
  }

  /**
   * Cambia de rol
   * @param role 
   */
  changeRole(role: RolModel) {
    this.auth.setActiveRole(role);
    this.open.set(false);
  }

  private format(ms: number): string {
    const s = Math.floor(ms / 1000);
    const h = Math.floor(s / 3600);
    const m = Math.floor((s % 3600) / 60);
    const sec = s % 60;

    return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${sec.toString().padStart(2, '0')}`;
  }
}
