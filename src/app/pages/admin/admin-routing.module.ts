import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminComponent } from './admin.component';
import { ManageAdminComponent } from './manage-admin/manage-admin.component';
import { IngredientComponent } from './ingredient/ingredient.component';
import { UserComponent } from './user/user.component';
import { UserAdminComponent } from './user-admin/user-admin.component';
import { NewmealComponent } from './newmeal/newmeal.component';
import { MenusComponent } from './menus/menus.component';

const routes: Routes = [
  {
    path:'meals', 
    component: AdminComponent
  },
  {
    path:'menus', 
    component: MenusComponent
  },
  {
    path:'meal/:id',
    component: ManageAdminComponent 
  },
  {
    path:'ingredients', 
    component: IngredientComponent
  },
  {
    path:'newmeal',
    component: NewmealComponent 
  },
  {
    path:'users', 
    component: UserComponent
  },
  {
    path:'user/:id',
    component: UserAdminComponent 
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
