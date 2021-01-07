import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { ManageAdminComponent } from './manage-admin/manage-admin.component';
import { IngredientComponent } from './ingredient/ingredient.component';
import { UserComponent } from './user/user.component';
import { UserAdminComponent } from './user-admin/user-admin.component';
import { NewmealComponent } from './newmeal/newmeal.component';
import { MenusComponent } from './menus/menus.component';


@NgModule({
  declarations: [
    AdminComponent,
    ManageAdminComponent,
    IngredientComponent,
    UserComponent,
    UserAdminComponent,
    NewmealComponent,
    MenusComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class AdminModule { }
