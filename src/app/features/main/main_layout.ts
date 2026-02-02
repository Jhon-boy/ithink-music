
/**
 * Componente para el layout principal
 */

import { CommonModule } from "@angular/common";
import { Component, effect, inject } from "@angular/core";
import { RouterOutlet } from "@angular/router";
import { mapRolToModuleTab } from "@core/mappers/rolMapper";
import { ModuleRegistreService } from "@core/services/module_registre_service";
import { AuthStateService } from "@features/auth/services/auth_state_service";
import { UserComponent } from "@features/user/user.component";
import { HeaderComponent } from "@shared/header/header.component";
import { NavbarComponent } from "@shared/navbar/navbar.component";

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [HeaderComponent, NavbarComponent, RouterOutlet, CommonModule],
  styleUrl: './main_layout.css',
  template: `
   <div class="layout-container">
     <app-header />

     <div class="layout-content">
       <app-navbar />

       <main class="main-content">
         <ng-container *ngIf="active() as tab">
           <ng-container *ngComponentOutlet="tab.component" />
         </ng-container>
       </main>
     </div>
   </div>
    `
})
export class MainLayoutComponent {
  active = inject(ModuleRegistreService).active$;
  private registry = inject(ModuleRegistreService);
  private authState = inject(AuthStateService);

  constructor() {
    effect(
      () => {
        const role = this.authState.activeRol$();
        if (!role) return;
        const modules = mapRolToModuleTab(role.name);
        this.registry.setModules(modules);
      },
      { allowSignalWrites: true }
    );
  }

}