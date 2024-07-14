import { Component } from '@angular/core';
import { ProductService } from '../product.service';
import { Product } from '../../models/product';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { FlexLayoutModule } from '@angular/flex-layout';
import { CartService } from '../../cart/cart.service';
import {MatSnackBar, MatSnackBarModule} from '@angular/material/snack-bar'; 
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [MatSelectModule, MatInputModule, MatSnackBarModule, FlexLayoutModule, CommonModule, MatCardModule, MatButtonModule],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent {
  products: Product[]= [];
  filteredPriducts: Product[] = [];
  sortOrder: string = "";

  constructor(private snackbar: MatSnackBar, private cartService: CartService, private productService: ProductService) {}
  
  ngOnInit(): void {
    this.productService.getProducts().subscribe(data => {
      this.products = data;
      this.filteredPriducts = data
    })
  }

  addToCart(product: Product): void {
    this.cartService.addToCart(product).subscribe({
      next: () => {
        this.snackbar.open("Product added to cart", "", {
          duration: 2000,
          horizontalPosition: 'right',
          verticalPosition: 'top'
        });
      }
    });
  }

  applyFilter(event: Event):void {
    let searchTerm = (event.target as HTMLInputElement).value.toLocaleLowerCase();

    this.filteredPriducts = this.products.filter(
      product => product.name.toLocaleLowerCase().includes(searchTerm)
    )

    this.sortProducts(this.sortOrder)
  }

  sortProducts(sortValue: string) {
    this.sortOrder = sortValue;

    if(this.sortOrder == "priceLowHigh") {
      this.filteredPriducts.sort((a,b) =>  a.price - b.price)
    } else if(this.sortOrder == "priceHighLow") {
      this.filteredPriducts.sort((a, b) => b.price - a.price ) 
    }
  }
}
