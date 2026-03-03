import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class PaymentHistoryService {
http: any;
getPayments() {
  return this.http.get('/payments');
}}
