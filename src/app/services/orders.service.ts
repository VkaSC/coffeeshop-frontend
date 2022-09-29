import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Rest, SearchOptions } from '../libs/connection/rest.base';
import { AuthToken } from '../models/authToken.model';
import Order from '../models/order.model';
import { StorageService } from './storage.service';

const URL = '/api/order'

@Injectable({
  providedIn: 'root'
})
export class OrdersService extends Rest {

  constructor(httpClient: HttpClient, private storageService: StorageService) {
    super(httpClient)
  }

  async listOrders(searchOptions?: SearchOptions): Promise<Order[] | undefined> {
    const response = await this.get<Order[]>(URL + this.getSearchOptions(searchOptions), {
      authorization: this.storageService.getLocalJson<AuthToken>(StorageService.TOKEN)?.access_token,
    });
    return response.result.data;
  }

  async getOrder(orderId: string): Promise<Order | undefined> {
    const response = await this.get<Order>(URL + '/' + orderId, {
      authorization: this.storageService.getLocalJson<AuthToken>(StorageService.TOKEN)?.access_token,
    });
    return response.result.data;
  }

  async addOrder(Order: Order): Promise<Order | undefined> {
    const response = await this.post<Order>(URL, Order, {
      authorization: this.storageService.getLocalJson<AuthToken>(StorageService.TOKEN)?.access_token,
      jsonBody: true,
    });
    return response.result.data;
  }

  async updateOrder(Order: Order): Promise<Order | undefined> {
    const response = await this.put<Order>(URL + '/' + Order.id, Order, {
      authorization: this.storageService.getLocalJson<AuthToken>(StorageService.TOKEN)?.access_token,
      jsonBody: true,
    });
    return response.result.data;
  }

  async deleteOrder(Order: Order): Promise<Order | undefined> {
    const response = await this.delete<Order>(URL + '/' + Order.id, {
      authorization: this.storageService.getLocalJson<AuthToken>(StorageService.TOKEN)?.access_token,
    });
    return response.result.data;
  }


}
