import { HttpClient } from '@angular/common/http';
import { Observable, pipe } from 'rxjs';
import { map, catchError, retry } from 'rxjs/operators';

import { API_URL } from '../constants/api-url';

import { handleError } from '../constants/handle-http-errors';
import { ImageOUT } from '../interfaces/image';

import { IngredientOUT } from '../interfaces/ingredient';

export class IngredientService {

  constructor(private http: HttpClient) {}

  getIngredient(ingredientId: number): Observable<IngredientOUT> {
    return (
      this.http
        .get<IngredientOUT>(`${API_URL}/ingredient/find/${ingredientId}`)
        .pipe(
          map((results) => {
            retry(3),
            catchError(handleError);
            return results;
          })
        )
    );
  }

  ingredients(): Observable<IngredientOUT[]> {
    return (
      this.http
        .get<IngredientOUT[]>(`${API_URL}/ingredient/findall`)
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
