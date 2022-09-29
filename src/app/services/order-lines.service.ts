import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Rest, SearchOptions } from '../libs/connection/rest.base';
import { Utils } from '../libs/utils/utils.utils';
import { AuthToken } from '../models/authToken.model';
import OrderLine from '../models/order-line.model';
import { StorageService } from './storage.service';

const URL = '/api/order/{order}/line'

@Injectable({
  providedIn: 'root'
})
export class OrderLinesService extends Rest {

  constructor(httpClient: HttpClient, private storageService: StorageService) {
    super(httpClient)
  }

  async listOrderLines(orderId: number, searchOptions?: SearchOptions): Promise<OrderLine[] | undefined> {
    const response = await this.get<OrderLine[]>(this.processURL(URL, { order: orderId }) + this.getSearchOptions(searchOptions), {
      authorization: this.storageService.getLocalJson<AuthToken>(StorageService.TOKEN)?.access_token,
    });
    return response.result.data;
  }

  async getOderLine(orderId: number, orderLineId: number): Promise<OrderLine | undefined> {
    const response = await this.get<OrderLine>(this.processURL(URL, { order: orderId }) + '/' + orderLineId, {
      authorization: this.storageService.getLocalJson<AuthToken>(StorageService.TOKEN)?.access_token,
    });
    return response.result.data;
  }

  async addOrderLine(orderId: number, orderLine: OrderLine | OrderLine[]): Promise<OrderLine | undefined> {
    const response = await this.post<OrderLine>(this.processURL(URL, { order: orderId }), Utils.forceArray(orderLine), {
      authorization: this.storageService.getLocalJson<AuthToken>(StorageService.TOKEN)?.access_token,
      jsonBody: true,
    });
    return response.result.data;
  }

  async updateOrderLine(orderId: number, orderLine: OrderLine): Promise<OrderLine | undefined> {
    const response = await this.put<OrderLine>(this.processURL(URL, { order: orderId }) + '/' + orderLine.id, orderLine, {
      authorization: this.storageService.getLocalJson<AuthToken>(StorageService.TOKEN)?.access_token,
      jsonBody: true,
    });
    return response.result.data;
  }

  async deleteOrderLine(orderId: number, orderLine: OrderLine): Promise<OrderLine | undefined> {
    const response = await this.delete<OrderLine>(this.processURL(URL, { order: orderId }) + '/' + orderLine.id, {
      authorization: this.storageService.getLocalJson<AuthToken>(StorageService.TOKEN)?.access_token,
    });
    return response.result.data;
  }
}
