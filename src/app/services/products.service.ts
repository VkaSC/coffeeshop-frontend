import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Rest, SearchOptions } from '../libs/connection/rest.base';
import { AuthToken } from '../models/authToken.model';
import Product from '../models/product.model';
import { StorageService } from './storage.service';

const URL = '/api/product'

@Injectable({
  providedIn: 'root'
})
export class ProductsService extends Rest {

  constructor(httpClient: HttpClient, private storageService: StorageService) {
    super(httpClient)
  }

  async listProducts(searchOptions?: SearchOptions): Promise<Product[] | undefined> {
    const response = await this.get<Product[]>(URL + this.getSearchOptions(searchOptions), {
      authorization: this.storageService.getLocalJson<AuthToken>(StorageService.TOKEN)?.access_token,
    });
    return response.result.data;
  }

  async getProduct(productId: string): Promise<Product | undefined> {
    const response = await this.get<Product>(URL + '/' + productId, {
      authorization: this.storageService.getLocalJson<AuthToken>(StorageService.TOKEN)?.access_token,
    });
    return response.result.data;
  }

  async addProduct(product: Product): Promise<Product | undefined> {
    const response = await this.post<Product>(URL, product, {
      authorization: this.storageService.getLocalJson<AuthToken>(StorageService.TOKEN)?.access_token,
      jsonBody: true,
    });
    return response.result.data;
  }

  async updateProduct(product: Product): Promise<Product | undefined> {
    const response = await this.put<Product>(URL + '/' + product.id, product, {
      authorization: this.storageService.getLocalJson<AuthToken>(StorageService.TOKEN)?.access_token,
      jsonBody: true,
    });
    return response.result.data;
  }

  async deleteProduct(product: Product): Promise<Product | undefined> {
    const response = await this.delete<Product>(URL + '/' + product.id, {
      authorization: this.storageService.getLocalJson<AuthToken>(StorageService.TOKEN)?.access_token,
    });
    return response.result.data;
  }
  
}
