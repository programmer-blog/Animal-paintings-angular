import { Component } from '@angular/core';
import { CartService } from '../cart.service';
import { Product } from '../../models/product';
import { MatCardModule } from '@angular/material/card';
import {MatListModule} from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-car-view',
  standalone: true,
  imports: [MatCardModule, MatListModule, MatButtonModule, CommonModule],
  templateUrl: './car-view.component.html',
  styleUrl: './car-view.component.css'
})
export class CarViewComponent {
  cartItems: Product[] = [];
  totalPrice: number = 0;

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.cartService.getCartItems().subscribe(data => {
      this.cartItems = data;
      this.totalPrice = this.getTotalPrice();
    });
  }
  getTotalPrice(): number {
    let total= 0;
    for (let item of this.cartItems) {
      total += item.price
    }

    return total;
  }

  clearCart() {
    this.cartService.clearCart().subscribe();
  }

  checkout(): void {
    this.cartService.checkout(this.cartItems).subscribe();
  }
  
}
