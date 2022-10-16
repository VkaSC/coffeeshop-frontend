import { Component, OnInit } from '@angular/core';
import Order from 'src/app/models/order.model';
import Product from 'src/app/models/product.model';
import OrderLine from 'src/app/models/order-line.model';
import { AuthService } from 'src/app/services/auth.service';
import { OrderLinesService } from 'src/app/services/order-lines.service';
import { OrdersService } from 'src/app/services/orders.service';
import { ProductsService } from 'src/app/services/products.service';
import { ToastService } from 'src/app/services/toast.service';
import DateUtils from 'src/app/libs/utils/date.utils';
import { ERROR_STATUS, HTMLCodes } from 'src/app/models/httpResponse.model';
import { Utils } from 'src/app/libs/utils/utils.utils';

@Component({
  selector: 'app-request',
  templateUrl: './request.component.html',
  styleUrls: ['./request.component.css']
})
export class RequestComponent implements OnInit {

  productsByCategory: { [key: string]: Product[] } = {};
  selectedProducts: Product[] = [];
  historicOrders: Order[] = [];
  total = 0;

  constructor(
    private productsService: ProductsService,
    private ordersService: OrdersService,
    private authService: AuthService,
    private toastService: ToastService,
  ) { }

  ngOnInit(): void {
    this.loadProducts();
    this.loadHistoricOrders();
  }

  onSelectProduct(product: Product) {
    let todayProducts = 0;
    if (this.historicOrders?.length > 0) {
      for (const order of this.historicOrders) {

      }
    }
    this.selectedProducts.push(product);
    this.calculateTotal();
  }

  onRemoveProduct(index: number) {
    this.selectedProducts = this.selectedProducts.filter((e, i) => { return i !== index });
    this.calculateTotal();
  }

  reorder(order: Order) {
    if (order.lines) {
      for (const line of order.lines) {
        for (let i = 0; i < line.quantity; i++) {
          this.selectedProducts.push(new Product(line.product));
        }
      }
    }
  }

  onClickHandler(event: any) {
    const source = event.target.name;
    if (source === 'confirm') {
      const order = new Order();
      order.device = !this.authService.loggedUser ? this.authService.getDeviceId() : undefined;
      order.userId = this.authService.loggedUser ? this.authService.loggedUser.id : undefined;
      order.total = 0;
      for (const product of this.selectedProducts) {
        order.total += product.price;
      }
      const linesByProduct: { [key: string]: OrderLine } = {};
      for (const product of this.selectedProducts) {
        if (!product.id) {
          continue;
        }
        if (!linesByProduct[product.id]) {
          linesByProduct[product.id] = new OrderLine();
          linesByProduct[product.id].productId = product.id;
        }
        linesByProduct[product.id].quantity++;
        linesByProduct[product.id].total += product.price;
      }
      if (Utils.hasKeys(linesByProduct)) {
        order.lines = Object.values(linesByProduct);
      }
      this.ordersService.addOrder(order).then((orderCreated: Order | undefined) => {
        this.loadHistoricOrders();
        this.selectedProducts = [];
        this.calculateTotal();
        this.toastService.success({
          header: 'Pedido Creado',
          message: 'El pedido ha sido registrado correctamente.'
        });
      }).catch((error) => {
        if (error.htmlCode === HTMLCodes.FORBIDDEN || error.htmlCode === HTMLCodes.UNAUTHORIZED) {
          if (ERROR_STATUS.LIMIT_REACHED_STATUS) {
            this.toastService.error({
              header: 'Límite superado',
              message: 'Ha superado el límite de productos que se puede pedir sin estar registrado',
            });
          } else {
            this.toastService.error({
              header: 'No autorizado',
              message: 'No esta autorizado para ejecutar esta operación',
            });
          }
        } else {
          this.toastService.error({
            header: 'Error',
            message: 'Ha ocurrido un error creando el pedido.'
          });
        }
      });
    }
  }

  calculateTotal() {
    this.total = 0;
    for (const product of this.selectedProducts) {
      this.total += product.price;
    }
  }

  loadProducts() {
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

  loadHistoricOrders() {

    let query = {};
    if(this.authService.loggedUser){
      query = {
        userId: 'eq__' + this.authService.loggedUser.id,
        sort: '-id',
      };
    } else {
      query = {
        device: 'eq__' + this.authService.getDeviceId(),
        sort: '-id',
      };
    }
    this.ordersService.listOrders({
      expand: true,
      query: query,
    }).then((orders: Order[] | undefined) => {
      if (orders) {
        this.historicOrders = orders;
      }
    }).catch((error) => {
      this.toastService.error({
        header: 'Error',
        message: 'Ha ocurrido un error cargando los datos del histórico de pedidos.',
      });
    });
  }

}
