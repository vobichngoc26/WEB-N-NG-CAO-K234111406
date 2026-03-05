import { Component } from '@angular/core';
import { CartService } from '../myservices/cart-service';

@Component({
  selector: 'app-product-cart',
  standalone: false,
  templateUrl: './product-cart.html',
  styleUrl: './product-cart.css',
})
export class ProductCart {
  products: any[] = [];
 constructor(private api: CartService) {}
ngOnInit() {
    this.api.getProducts().subscribe(data => {
      this.products = data as any[];
    });
  }

  addToCart(id: string) {
    this.api.addToCart(id).subscribe(() => {
      alert("Added to cart");
    });
  }
}
