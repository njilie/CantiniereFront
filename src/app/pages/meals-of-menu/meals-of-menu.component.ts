import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { MenuService } from '../../shared/services/menu.service';
import { OrderService } from '../../shared/services/order.service';

import { MenuOUT } from '../../shared/interfaces/menu';
import { ImageOUT } from '../../shared/interfaces/image';
import { User /*UserOUT*/} from '../../shared/interfaces/user';
import { AuthService } from '../../shared/auth/auth.service';

import { API_URL } from '../../shared/constants/api-url';
import { MealService } from 'src/app/shared/services/meal.service';

@Component({
  selector: 'app-meals-of-menu',
  templateUrl: './meals-of-menu.component.html',
  styleUrls: ['./meals-of-menu.component.css']
})
export class MealsOfMenuComponent implements OnInit {
  menu!: MenuOUT;
  menuId!: number;
  menusImages!: ImageOUT[];
  loading!: boolean;

  constructor(
    private menuService: MenuService,
    private mealService: MealService,
    private route: ActivatedRoute,
    private orderService: OrderService,
    private authService: AuthService) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.menuId = +params.get('id');
    });

    this.getMenu(this.menuId);
  }

  getMenu(menuId: number): void {
    this.loading = true;

    this.menuService.getMenu(menuId).subscribe(
      (menu) => {
        this.menu = menu;
        this.loading = false;
        this.menu.meals.forEach((menuMeal) => {
          this.mealService.getMealImage(menuMeal.id).subscribe(
            (image) => { 
              menuMeal.imgUrl = `${API_URL}/`+image.imagePath;
            },
           (error) => {
             console.log(error);
            }
        );
       });
      },
      (error) => {
        console.log(error);
      }
    );
  }

  orderMaker(menuId: number): void {
    if (confirm('Etes-vous sûr de vouloir ajouter ce menu au panier ?')) {

      this.loading = true;
      const user: User = this.authService.userLogged();
      if (user) {
        this.orderService.orderMaker(user.id, 'menu', null, menuId);
      }

    }
  }

}
