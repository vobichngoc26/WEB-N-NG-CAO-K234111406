import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartService {
 private baseUrl = 'http://localhost:3002';

  constructor(private http: HttpClient) {}

  getProducts() {
    return this.http.get(`${this.baseUrl}/products`);
  }

  addToCart(productId: string) {
    return this.http.post(
      `${this.baseUrl}/cart/add`,
      { productId },
      { withCredentials: true }
    );
  }

  getCart() {
    return this.http.get(
      `${this.baseUrl}/cart`,
      { withCredentials: true }
    );
  }

  removeFromCart(productId: string) {
    return this.http.post(
      `${this.baseUrl}/cart/remove`,
      { productId },
      { withCredentials: true }
    );
  }

  clearCart() {
    return this.http.post(
      `${this.baseUrl}/cart/clear`,
      {},
      { withCredentials: true }
    );
  }
}
