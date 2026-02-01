import { Routes } from '@angular/router';
import { authGuard } from '@core/guards/auth.guard';
import { loginGuard } from '@features/auth/guards/login_guard';
import { LoginComponent } from '@features/auth/login/login.component'; 
import { MainLayoutComponent } from '@features/main/main_layout';
import { UserComponent } from '@features/user/user.component';

export const routes: Routes = [
    {
        path: 'login',
        component: LoginComponent,
        canActivate: [loginGuard]
    },
    {
        path: '',
        component: MainLayoutComponent,
        canActivate: [authGuard]
    },
    {
        path: 'user',
        component: UserComponent,
        canActivate: [authGuard]
    },
    {
        path: '**',
        redirectTo: 'login'
    }
];
