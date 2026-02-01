import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { UserFullModel } from '@core/models/auth.model';
import { UserService } from './services/user_service';
import { ModuleRegistreService } from '@core/services/module_registre_service';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent implements OnInit {

  user: UserFullModel | null = null;

  constructor(private userService: UserService) {
  }

  ngOnInit(): void {
    this.loadUser();
  }

  private loadUser(): void {
    this.userService.getUser(true).subscribe(resp => {
      if (resp.success) {
        this.user = resp.data;
      }
    })
  }

}
