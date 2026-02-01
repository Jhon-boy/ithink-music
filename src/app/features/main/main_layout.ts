
/**
 * Componente para el layout principal
 */

import { CommonModule } from "@angular/common";
import { Component, inject } from "@angular/core";
import { RouterOutlet } from "@angular/router";
import { ModuleRegistreService } from "@core/services/module_registre_service";
import { UserComponent } from "@features/user/user.component";
import { HeaderComponent } from "@shared/header/header.component";
import { NavbarComponent } from "@shared/navbar/navbar.component";

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [HeaderComponent, NavbarComponent, RouterOutlet, CommonModule],
  template: `
   <app-header />

    <div class="flex h-[calc(100vh-56px)]">
      <app-navbar />

      <main class="flex-1 bg-slate-100 p-4 overflow-auto">
        <ng-container *ngIf="active() as tab">
          <ng-container *ngComponentOutlet="tab.component" />
        </ng-container>
      </main>
    </div>
    
    `
})
export class MainLayoutComponent {
  active = inject(ModuleRegistreService).active$;
  private registry = inject(ModuleRegistreService);

  constructor() {
    // Registramos el TAB del Perfil del usuario
    this.registerTabsProfile();
  }

  /**
   * Registra los tabs de la aplicación
   */
  private registerTabsProfile() {
    this.registry.register({
      id: 'user',
      title: 'Mi Perfil',
      component: UserComponent
    });
  }
}