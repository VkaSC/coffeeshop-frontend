import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Rest, SearchOptions } from '../libs/connection/rest.base';
import RequestLine from '../models/request-line.model';

const URL = '/api/order/{order}/line'

@Injectable({
  providedIn: 'root'
})
export class OrderLinesService extends Rest {

  constructor(httpClient: HttpClient) {
    super(httpClient)
  }

  async listOrderLines(orderId: number, searchOptions?: SearchOptions): Promise<RequestLine[] | undefined> {
    const response = await this.get<RequestLine[]>(this.processURL(URL, { order: orderId }) + this.getSearchOptions(searchOptions));
    return response.result.data;
  }

  async getOderLine(orderId: number, orderLineId: number): Promise<RequestLine | undefined> {
    const response = await this.get<RequestLine>(this.processURL(URL, { order: orderId }) + '/' + orderLineId);
    return response.result.data;
  }

  async addOrderLine(orderId: number, orderLine: RequestLine): Promise<RequestLine | undefined> {
    const response = await this.post<RequestLine>(this.processURL(URL, { order: orderId }), orderLine, {
      jsonBody: true,
    });
    return response.result.data;
  }

  async updateOrderLine(orderId: number, orderLine: RequestLine): Promise<RequestLine | undefined> {
    const response = await this.put<RequestLine>(this.processURL(URL, { order: orderId }) + '/' + orderLine.id, orderLine, {
      jsonBody: true,
    });
    return response.result.data;
  }

  async deleteOrderLine(orderId: number, orderLine: RequestLine): Promise<RequestLine | undefined> {
    const response = await this.delete<RequestLine>(this.processURL(URL, { order: orderId }) + '/' + orderLine.id);
    return response.result.data;
  }
}
