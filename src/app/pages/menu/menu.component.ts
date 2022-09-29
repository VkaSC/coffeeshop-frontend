import { Component, OnInit } from '@angular/core';
import Product from 'src/app/models/product.model';
import { ProductsService } from 'src/app/services/products.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  productsByCategory: { [key: string]: Product[] } = {};

  constructor(
    private productsService: ProductsService,
    private toastService: ToastService,
  ) { }

  ngOnInit(): void {
    this.productsService.listProducts({
      expand: true,
    }).then((products: Product[] | undefined) => {
      this.productsByCategory = {};
      if (products && products.length > 0) {
        for (const product of products) {
          if (!this.productsByCategory[product.category]) {
            this.productsByCategory[product.category] = []
          }
          this.productsByCategory[product.category].push(product);
        }
      }
    }).catch((error) => {
      this.toastService.error({
        header: 'Error',
        message: 'Ha ocurrido un error cargando los datos de la carta.',
      });
    });
  }

}
