import { Routes } from '@angular/router';
import { authGuard } from '@core/guards/auth.guard';
import { LoginComponent } from '@features/auth/login/login.component';
import { HomeComponent } from '@features/home/home.component';
import { UserComponent } from '@features/user/user.component';

export const routes: Routes = [
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'home',
        component: HomeComponent,
        canActivate: [authGuard]
    },
    {
        path: 'user',
        component: UserComponent,
        canActivate: [authGuard]
    },
    {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full'
    },
    {
        path: '**',
        redirectTo: 'login'
    }
];
