import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TemplateComponent } from './components/template/template.component';
import { MealsOfMenuComponent } from './pages/meals-of-menu/meals-of-menu.component';
import { ForgotComponent } from './pages/authentication/forgot/forgot.component';
import { LoginComponent } from './pages/authentication/login/login.component';
import { LogoutComponent } from './pages/authentication/logout/logout.component';
import { RegisterComponent } from './pages/authentication/register/register.component';
import { ProfileComponent } from './pages/profile/profile.component';

import { AuthService } from './shared/auth/auth.service';

const routes: Routes = [
  {
    path: 'admin', // /admin
    loadChildren: () => import('./pages/admin/admin.module').then(m => m.AdminModule),
    canActivate: [AuthService]
  },
  {
    path: 'login', // /login
    component: LoginComponent
  },
  {
    path: 'register', // /register
    component: RegisterComponent
  },
  {
    path: 'forgot', // /forgot
    component: ForgotComponent
  },
  {
    path: 'logout', // /logout
    component: LogoutComponent
  },
  {
    path: '', // /
    component: TemplateComponent,
    children: [
      {
        path: '', // /home <- Page par défaut
        redirectTo: 'home',
        pathMatch: 'full'
      },
      {
        path: 'home', // /home
        loadChildren: () => import('./pages/home/home.module').then(m => m.HomeModule)
      },
      {
        path: 'menu/:id/meals', // /menu/:id/meals
        component: MealsOfMenuComponent,
      },
      {
        path: 'orders', // /orders
        loadChildren: () => import('./pages/orders/orders.module').then(m => m.OrdersModule),
        canActivate: [AuthService]
      },
      {
        path: 'profile', // /profile
        component: ProfileComponent,
        canActivate: [AuthService]
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
