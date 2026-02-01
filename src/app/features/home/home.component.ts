import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ModuleRegistreService } from '@core/services/module_registre_service';
import { LoginService } from '@features/auth/services/login_service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  // Registrar el módulo en el registro
  constructor(registry: ModuleRegistreService, private loginService: LoginService) {
    registry.register({
      id: 'home',
      title: 'Home',
      icon: 'home',
      component: HomeComponent
    });
  }

  loadUser(){
    this.loginService
  }
}
