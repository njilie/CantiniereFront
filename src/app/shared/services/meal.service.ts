import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, pipe } from 'rxjs';
import { map, catchError, retry } from 'rxjs/operators';

import { API_URL } from '../constants/api-url';

import { handleError } from '../constants/handle-http-errors';

import { MealOUT } from '../interfaces/meal';
import { ImageOUT } from '../interfaces/image';

@Injectable({
  providedIn: 'root'
})
export class MealService {

  constructor(private http: HttpClient) {}

  getMealsForThisWeek(): Observable<MealOUT[]> {
    return (
      this.http
        .get<MealOUT[]>(`${API_URL}/meal/findallavailablefortoday`)
        .pipe(
          map((results) => {
            retry(3),
            catchError(handleError);
            return results;
          })
        )
    );
  }

  getMeal(mealId: number): Observable<MealOUT> {
    return (
      this.http
        .get<MealOUT>(`${API_URL}/meal/find/${mealId}`)
        .pipe(
          map((results) => {
            retry(3),
            catchError(handleError);
            return results;
          })
        )
    );
  }

  getMealImage(mealId: number): Observable<ImageOUT> {
    return (
      this.http
        .get<ImageOUT>(`${API_URL}/meal/findimg/${mealId}`)
        .pipe(
          map((results) => {
            retry(3),
            catchError(handleError);
            return results;
          })
        )
    );
  }
}
