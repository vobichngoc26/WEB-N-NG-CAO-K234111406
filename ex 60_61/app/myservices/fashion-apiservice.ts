import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, retry, throwError } from 'rxjs';
import { Fashion } from '../myclasses/Fashion';

@Injectable({
  providedIn: 'root',
})
export class FashionAPIService {

  constructor(private _http: HttpClient) { }

  // GET ALL
  getFashions(): Observable<Fashion[]> {
    return this._http.get<Fashion[]>('/fashions').pipe(
      retry(3),
      catchError(this.handleError)
    );
  }

  // GET BY ID
  getFashion(id: string): Observable<Fashion> {
    return this._http.get<Fashion>(`/fashions/${id}`).pipe(
      retry(3),
      catchError(this.handleError)
    );
  }

  handleError(error: HttpErrorResponse) {
    return throwError(() => new Error(error.message));
  }
}
