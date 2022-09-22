import { Component, OnInit } from '@angular/core';
import Product from 'src/app/models/product.model';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  productsByCategory: { [key: string]: Product[] } = {};

  constructor(
    private productService: ProductsService
  ) { }

  ngOnInit(): void {
    this.productService.listProducts().then((products: Product[] | undefined) => {
      if (products && products.length > 0) {
        for (const product of products) {
          if (!this.productsByCategory[product.category]) {
            this.productsByCategory[product.category] = []
          }
          this.productsByCategory[product.category].push(product);
        }
        console.log(this.productsByCategory);
      }
    }).catch();
  }

}
