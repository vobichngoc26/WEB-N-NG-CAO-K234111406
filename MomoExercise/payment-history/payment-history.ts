import { Component } from '@angular/core';
import { PaymentHistoryService } from '../myservices/payment-history';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-payment-history',
  standalone: false,
  templateUrl: './payment-history.html',
  styleUrl: './payment-history.css',
})
export class PaymentHistory {
 payments: any[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.loadPayments();
  }

  loadPayments() {
    this.http.get<any[]>("http://localhost:3002/payments")
      .subscribe(data => {
        this.payments = data;
      });
  }}
