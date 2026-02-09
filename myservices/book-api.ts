import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, retry, throwError } from 'rxjs';
import { IBook } from '../myclasses/iBook';

@Injectable({ providedIn: 'root' })
export class BookApiService {
  private api = 'http://localhost:3000/books';

  constructor(private http: HttpClient) {}

  getBooks(): Observable<IBook[]> {
    return this.http.get<IBook[]>(this.api)
      .pipe(retry(3), catchError(this.handleError));
  }

  getBook(id: string): Observable<IBook> {
    return this.http.get<IBook>(`${this.api}/${id}`)
      .pipe(retry(3), catchError(this.handleError));
  }

  postBook(book: IBook): Observable<IBook> {
    return this.http.post<IBook>(this.api, book)
      .pipe(retry(3), catchError(this.handleError));
  }

  putBook(id: string, book: IBook): Observable<IBook> {
    return this.http.put<IBook>(`${this.api}/${id}`, book)
      .pipe(retry(3), catchError(this.handleError));
  }

  deleteBook(id: string) {
    return this.http.delete(`${this.api}/${id}`)
      .pipe(retry(3), catchError(this.handleError));
  }

  handleError(error: HttpErrorResponse) {
    return throwError(() => new Error(error.message));
  }
  uploadImage(data: FormData): Observable<any> {
  return this.http.post('http://localhost:3000/upload', data);
}
  
}
