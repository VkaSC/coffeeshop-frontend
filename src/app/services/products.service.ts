import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Rest, SearchOptions } from '../libs/connection/rest.base';
import Product from '../models/product.model';

const URL = '/api/product'

@Injectable({
  providedIn: 'root'
})
export class ProductsService extends Rest {

  constructor(httpClient: HttpClient) {
    super(httpClient)
  }

  async listProducts(searchOptions?: SearchOptions): Promise<Product[] | undefined> {
    const response = await this.get<Product[]>(URL + this.getSearchOptions(searchOptions));
    return response.result.data;
  }

  async getProduct(productId: string): Promise<Product | undefined> {
    const response = await this.get<Product>(URL + '/' + productId);
    return response.result.data;
  }

  async addProduct(product: Product): Promise<Product | undefined> {
    const response = await this.post<Product>(URL, product, {
      jsonBody: true,
    });
    return response.result.data;
  }

  async updateProduct(product: Product): Promise<Product | undefined> {
    const response = await this.put<Product>(URL + '/' + product.id, product, {
      jsonBody: true,
    });
    return response.result.data;
  }

  async deleteProduct(product: Product): Promise<Product | undefined> {
    const response = await this.delete<Product>(URL + '/' + product.id);
    return response.result.data;
  }
  
}
