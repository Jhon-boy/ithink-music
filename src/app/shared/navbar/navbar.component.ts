import { Component, inject } from '@angular/core';
import { ModuleRegistreService } from '@core/services/module_registre_service';
import { AuthStateService } from '@features/auth/services/auth_state_service';
/**
 * Componente para la navegación lateral
 */
@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

  registry = inject(ModuleRegistreService);
  auth = inject(AuthStateService);

  modules = this.registry.modules$;
  // Variable para verificar si el usuario está autenticado
  isLoggedIn = this.auth.isLoggedIn$;
  // Variable para almacenar el módulo expandido
  expanded: string | null = null;
  /**
   * Expande o contrae el módulo
   * @param module 
   */
  toggle(module: string) {
    this.expanded = this.expanded === module ? null : module;
  }
}
