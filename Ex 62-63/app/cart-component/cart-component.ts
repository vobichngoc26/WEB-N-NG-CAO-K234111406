import { Component } from '@angular/core';
import { CartService } from '../myservices/cart-service';

@Component({
  selector: 'app-cart-component',
  standalone: false,
  templateUrl: './cart-component.html',
  styleUrl: './cart-component.css',
})
export class CartComponent {
cartItems: any[] = [];
  total: number = 0;

  constructor(private api: CartService) {}

  ngOnInit() {
    this.loadCart();
  }

  loadCart() {
    this.api.getCart().subscribe(data => {
      this.cartItems = data as any[];
      this.total = this.cartItems.reduce((sum, item) =>
        sum + (item.price * item.quantity), 0);
    });
  }

  remove(productId: string) {
  this.api.removeFromCart(productId).subscribe(() => {
    this.loadCart();
  });
}
}
