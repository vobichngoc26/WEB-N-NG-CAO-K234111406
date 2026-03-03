import { Component } from '@angular/core';
import { MomoApi } from '../myservices/momo-api';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-paymentmomo',
  standalone: false,
  templateUrl: './paymentmomo.html',
  styleUrl: './paymentmomo.css',
})
export class Paymentmomo {
  amount: number = 0;

  constructor(private http: HttpClient) {}

  payWithMomo() {
    this.http.post<any>("http://localhost:3002/payment/momo", {
      amount: this.amount
    })
    .subscribe(res => {

      console.log("Saved to DB, response:", res);

      if (res.payUrl) {
        window.location.href = res.payUrl;
      }
    });
  }
}