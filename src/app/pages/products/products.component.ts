import { Component, OnInit, ViewChild } from '@angular/core';
import { DialogMode } from 'src/app/components/modal/modal.component';
import { ProductModalComponent } from 'src/app/components/product-modal/product-modal.component';
import { HTMLCodes } from 'src/app/models/httpResponse.model';
import Product from 'src/app/models/product.model';
import { AlertService } from 'src/app/services/alert.service';
import { ProductsService } from 'src/app/services/products.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  @ViewChild('productModal') private productModal?: ProductModalComponent
  products?: Product[];
  constructor(
    private productsService: ProductsService,
    private toastService: ToastService,
    private alertService: AlertService,
  ) { }

  ngOnInit(): void {
    this.loadProducts();
  }

  new() {
    this.productModal?.open(DialogMode.New)?.then((reason) => {
      this.loadProducts();
    }).catch(reason => {

    });
  }

  view(product: Product) {
    this.productModal?.open(DialogMode.View, product)?.then((reason) => {

    }).catch(reason => {

    });
  }

  edit(product: Product) {
    this.productModal?.open(DialogMode.Edit, product)?.then((reason) => {
      this.loadProducts();
    }).catch(reason => {

    });
  }

  delete(product: Product) {
    this.alertService.alert({
      title: 'Eliminar Producto',
      message: 'Va a eliminar el producto ' + product.name + ' del grupo ' + product.type + '. ¿Seguro?',
    })?.then(() => {
      this.productsService.deleteProduct(product).then(() => {
        this.loadProducts();
        this.toastService.success({
          header: 'Producto Eliminado',
          message: 'El Producto ha sido eliminado correctamente',
        });
      }).catch((error) => {
        if (error.htmlCode === HTMLCodes.FORBIDDEN || error.htmlCode === HTMLCodes.UNAUTHORIZED) {
          this.toastService.error({
            header: 'No autorizado',
            message: 'No esta autorizado para ejecutar esta operación',
          });
        } else {
          this.toastService.error({
            header: 'Error',
            message: 'Ha ocurrido un error eliminando el producto'
          });
        }
      });
    }).catch(() => {

    });
  }

  loadProducts() {
    this.productsService.listProducts({
      expand: true,
      order: 'ASC',
      orderBy: ['type', 'category'],
    }).then((productsResult: Product[] | undefined) => {
      this.products = productsResult;
    }).catch((error) => {
      this.toastService.error({
        header: 'Error',
        message: 'Ha ocurrido un error cargando los productos.',
      });
    });
  }

}
