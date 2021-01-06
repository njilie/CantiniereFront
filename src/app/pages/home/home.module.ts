import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from '../home/home.component';
import { InfoComponent } from '../../components/info/info.component';
import { OrderableComponent } from '../../components/orderable/orderable.component';
import { WeeklyMenusComponent } from '../../components/weekly-menus/weekly-menus.component';
import { MealsComponent } from '../../components/meals/meals.component';

import { OrderService } from '../../shared/services/order.service';

import { MatTabsModule } from '@angular/material/tabs';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSnackBarModule } from '@angular/material/snack-bar';

@NgModule({
  declarations: [
    HomeComponent,
    InfoComponent,
    OrderableComponent,
    WeeklyMenusComponent,
    MealsComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    MatTabsModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatSnackBarModule
  ],
  providers: [
    OrderService
  ]
})
export class HomeModule { }
