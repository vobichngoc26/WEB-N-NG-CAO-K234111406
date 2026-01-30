import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, retry, throwError } from 'rxjs';
import { ICrypto } from '../myclasses/iCrypto';

@Injectable({
  providedIn: 'root',
})
export class CryptoService {
 private _url: string = '/v1/ticker/';

  constructor(private _http: HttpClient) {}

  getCryptoData(): Observable<ICrypto[]> {
    const headers = new HttpHeaders().set(
      'Content-Type',
      'text/plain;charset=utf-8'
    );

    const requestOptions: Object = {
      headers: headers,
      responseType: 'text',
    };

    return this._http.get<any>(this._url, requestOptions).pipe(
      map(res => JSON.parse(res) as ICrypto[]),
      retry(3),
      catchError(this.handleError)
    );
  }

  handleError(error: HttpErrorResponse) {
    return throwError(() => new Error(error.message));
  } 
}
