import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Rest, SearchOptions } from '../libs/connection/rest.base';
import Order from '../models/order.model';

const URL = '/api/order'

@Injectable({
  providedIn: 'root'
})
export class OrdersService extends Rest {

  constructor(httpClient: HttpClient) {
    super(httpClient)
  }

  async listOrders(searchOptions?: SearchOptions): Promise<Order[] | undefined> {
    const response = await this.get<Order[]>(URL + this.getSearchOptions(searchOptions));
    return response.result.data;
  }

  async getOrder(orderId: string): Promise<Order | undefined> {
    const response = await this.get<Order>(URL + '/' + orderId);
    return response.result.data;
  }

  async addOrder(Order: Order): Promise<Order | undefined> {
    const response = await this.post<Order>(URL, Order, {
      jsonBody: true,
    });
    return response.result.data;
  }

  async updateOrder(Order: Order): Promise<Order | undefined> {
    const response = await this.put<Order>(URL + '/' + Order.id, Order, {
      jsonBody: true,
    });
    return response.result.data;
  }

  async deleteOrder(Order: Order): Promise<Order | undefined> {
    const response = await this.delete<Order>(URL + '/' + Order.id);
    return response.result.data;
  }


}
