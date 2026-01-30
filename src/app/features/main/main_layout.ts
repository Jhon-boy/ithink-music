
/**
 * Componente para el layout principal
 */

import { Component } from "@angular/core";
import { RouterOutlet } from "@angular/router";
import { HeaderComponent } from "@shared/header/header.component";
import { NavbarComponent } from "@shared/navbar/navbar.component";

@Component({
    selector: 'app-main-layout',
    standalone: true,
    imports: [HeaderComponent, NavbarComponent, RouterOutlet],
    template: `
   <app-header></app-header>

    <div class="flex h-[calc(100vh-56px)]">
      <app-navbar></app-navbar>

      <main class="flex-1 bg-slate-100 p-4 overflow-auto">
        <router-outlet></router-outlet>
      </main>
    </div>
    
    `
})
export class MainLayoutComponent { }