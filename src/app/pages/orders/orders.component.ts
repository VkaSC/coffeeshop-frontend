import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import DateUtils from 'src/app/libs/utils/date.utils';
import { HTMLCodes, HttpResponse } from 'src/app/models/httpResponse.model';
import Order from 'src/app/models/order.model';
import Product from 'src/app/models/product.model';
import { OrdersService } from 'src/app/services/orders.service';
import { ToastService } from 'src/app/services/toast.service';

const HOUR_LIMIT = 8;
const MINUTES_LIMIT = 15;

@Component({
    selector: 'app-orders',
    templateUrl: './orders.component.html',
    styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {

    todayOrders: Order[] = [];
    productsCount: {
        [key: number]: {
            product: Product,
            count: number,
        }
    } = {};
    revenuePrevision = 0;
    historicOrders: Order[] = [];
    page = 1;
    form = new FormGroup({
        period: new FormControl<'today' | 'all'>('today'),
    });

    get workForToday(){
        return Object.values(this.productsCount);
    }

    get ordersToShow() {
        return this.form.controls.period.value === 'today' ? this.todayOrders : this.historicOrders;
    }

    constructor(
        private ordersService: OrdersService,
        private toastService: ToastService,
    ) {
        this.form.controls.period.valueChanges.subscribe(() => {
            this.loadHistoricOrders();
        });
    }

    ngOnInit() {
        this.loadOrders();
        this.loadHistoricOrders();
    }

    async loadOrders() {
        const today = DateUtils.todayEsES();
        const todayLimit = DateUtils.exactDate(today.getFullYear(), today.getMonth() + 1, today.getDate(), HOUR_LIMIT, MINUTES_LIMIT + 1, 0);
        const yesterdayLimit = new Date(todayLimit.getTime() - DateUtils.getDaysInMillis(1));
        const orders = await this.ordersService.listOrders({
            expand: true,
            all: true,
            query: {
                date: 'bwe__' + (yesterdayLimit.getTime()) + ',' + todayLimit.getTime()
            }
        });
        this.todayOrders = orders || [];
        for (const order of this.todayOrders) {
            if (order.lines) {
                for (const line of order.lines) {
                    if (line.product && line.product.id) {
                        if (!this.productsCount[line.product.id]) {
                            this.productsCount[line.product.id] = {
                                product: line.product,
                                count: 0,
                            };
                        }
                        this.productsCount[line.product.id].count += line.quantity;
                    }
                    this.revenuePrevision += line.total;
                }
            }
        }
    }

    async loadHistoricOrders() {
        try {
            if (this.form.controls.period.value !== 'today') {
                const orders = await this.ordersService.listOrders({
                    expand: true,
                    page: this.page,
                    query: {
                        sort: '-id',
                    }
                });
                this.historicOrders = orders || [];
                console.log(orders);
            }
        } catch (err) {
            const error = err as HttpResponse<Order[]>;
            if (error.htmlCode === HTMLCodes.FORBIDDEN || error.htmlCode === HTMLCodes.UNAUTHORIZED) {
                this.toastService.error({
                    header: 'No autorizado',
                    message: 'No esta autorizado para ejecutar esta operación',
                });
            } else {
                this.toastService.error({
                    header: 'Error cargando los pedidos de hoy',
                    message: 'Ha ocurrido un error cargando los pedidos de hoy. Inténtelo de nuevo más tarde',
                });
            }
        }
    }

    view(order: Order) {

    }

}
