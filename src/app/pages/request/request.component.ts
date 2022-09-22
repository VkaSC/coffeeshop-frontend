import { Component, OnInit } from '@angular/core';
import Order from 'src/app/models/order.model';
import Product from 'src/app/models/product.model';
import RequestLine from 'src/app/models/request-line.model';
import { AuthService } from 'src/app/services/auth.service';
import { OrderLinesService } from 'src/app/services/order-lines.service';
import { OrdersService } from 'src/app/services/orders.service';
import { ProductsService } from 'src/app/services/products.service';
import { ToastService } from 'src/app/services/toast.service';

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
    private orderLinesService: OrderLinesService,
    private authService: AuthService,
    private toastService: ToastService,
  ) { }

  ngOnInit(): void {
    this.productsService.listProducts({
      expand: true,
    }).then((products: Product[] | undefined) => {
      if (products && products.length > 0) {
        for (const product of products) {
          if (!this.productsByCategory[product.category]) {
            this.productsByCategory[product.category] = []
          }
          this.productsByCategory[product.category].push(product);
        }
        console.log(this.productsByCategory);
      }
    }).catch((error) => {
      this.toastService.error({
        header: 'Error',
        message: 'Ha ocurrido un error cargando los datos de la carta.',
      });
    });
    this.ordersService.listOrders({
      expand: true,
      query: {
        device: 'eq__' + this.authService.getDeviceId(),
      }
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

  onSelectProduct(product: Product) {
    this.selectedProducts.push(product);
    this.calculateTotal();
  }

  onRemoveProduct(index: number) {
    this.selectedProducts = this.selectedProducts.filter((e, i) => { return i !== index });
    this.calculateTotal();
  }

  onClickHandler(event: any) {
    const source = event.target.name;
    if (source === 'confirm') {
      const order = new Order();
      order.device = this.authService.getDeviceId();
      order.date = Date.now();
      this.ordersService.addOrder(order).then(async (orderCreated: Order | undefined) => {
        if (orderCreated && orderCreated.id) {
          const linesByProduct: { [key: string]: RequestLine } = {};
          for (const product of this.selectedProducts) {
            if (!product.id || !orderCreated.id) {
              continue;
            }
            if (!linesByProduct[product.id]) {
              linesByProduct[product.id] = new RequestLine();
              linesByProduct[product.id].productId = product.id;
              linesByProduct[product.id].requestId = orderCreated.id;
            }
            linesByProduct[product.id].quantity++;
            linesByProduct[product.id].total += product.price;
          }
          for (const productId of Object.keys(linesByProduct)) {
            const createdLine = await this.orderLinesService.addOrderLine(orderCreated.id, linesByProduct[productId]);
          }
          this.selectedProducts = [];
          this.toastService.success({
            header: 'Pedido Creado',
            message: 'El pedido ha sido registrado correctamente.'
          });
        } else {
          this.toastService.error({
            header: 'Error',
            message: 'Ha ocurrido un error creando el pedido. Perdido no creado.'
          });
        }
      }).catch((error) => {
        this.toastService.error({
          header: 'Error',
          message: 'Ha ocurrido un error creando el pedido.'
        });
      });
    }
  }

  calculateTotal() {
    this.total = 0;
    for (const product of this.selectedProducts) {
      this.total += product.price;
    }
  }

}
