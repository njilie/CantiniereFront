import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, pipe } from 'rxjs';
import { map, catchError, retry } from 'rxjs/operators';

import { API_URL } from '../constants/api-url';

import { handleError } from '../constants/handle-http-errors';

import { ConstraintOUT, ConstraintIN } from '../interfaces/constraint';

@Injectable({
  providedIn: 'root'
})
export class ConstraintService {

  constructor(private http: HttpClient) { }

  constraints(): Observable<ConstraintOUT[]> {
    return (
      this.http
        .get<ConstraintOUT[]>(`${API_URL}/constraint/findall`)
        .pipe(
          map((results) => {
            retry(3),
            catchError(handleError);
            return results;
          })
        )
    );
  }

  constraint(constraintId: number): Observable<ConstraintOUT> {
    return (
      this.http
        .get<ConstraintOUT>(`${API_URL}/constraint/find/${constraintId}`)
        .pipe(
          map((results) => {
            retry(3),
            catchError(handleError);
            return results;
          })
        )
    );
  }

  update(id: number, constraint: ConstraintIN): Observable<ConstraintOUT> {
    return (
      this.http
        .patch<ConstraintOUT>(`${API_URL}/constraint/update/${id}`, constraint)
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
