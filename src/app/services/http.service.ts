import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(
    private httpClient: HttpClient
  ) {

  }

  async doGet<T>(endpoint: string) {
    return this.httpClient.get<T>(endpoint, {
      headers: {
        api_key: '',
      }
    });
  }

  async doPost() {

  }

  async doPut() {

  }

  async doDelete() {

  }

}
