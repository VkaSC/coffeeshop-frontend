import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Rest, SearchOptions } from '../libs/connection/rest.base';
import Allergen from '../models/allergen-model';
import { AuthToken } from '../models/authToken.model';
import { StorageService } from './storage.service';

const URL = '/api/allergen'

@Injectable({
  providedIn: 'root'
})
export class AllergensService extends Rest {

  constructor(httpClient: HttpClient, private storageService: StorageService) {
    super(httpClient)
  }

  async listAllergens(searchOptions?: SearchOptions): Promise<Allergen[] | undefined> {
    const token = this.storageService.getLocalJson<AuthToken>(StorageService.TOKEN) || this.storageService.getSessionJson<AuthToken>(StorageService.TOKEN);
    const response = await this.get<Allergen[]>(URL + this.getSearchOptions(searchOptions), {
      authorization: token?.access_token,
    });
    return response.result.data;
  }

  async getAllergen(allergenId: string): Promise<Allergen | undefined> {
    const token = this.storageService.getLocalJson<AuthToken>(StorageService.TOKEN) || this.storageService.getSessionJson<AuthToken>(StorageService.TOKEN);
    const response = await this.get<Allergen>(URL + '/' + allergenId, {
      authorization: token?.access_token,
    });
    return response.result.data;
  }

  async addAllergen(allergen: Allergen): Promise<Allergen | undefined> {
    const token = this.storageService.getLocalJson<AuthToken>(StorageService.TOKEN) || this.storageService.getSessionJson<AuthToken>(StorageService.TOKEN);
    const response = await this.post<Allergen>(URL, allergen, {
      authorization: token?.access_token,
      jsonBody: true,
    });
    return response.result.data;
  }

  async updateAllergen(allergen: Allergen): Promise<Allergen | undefined> {
    const token = this.storageService.getLocalJson<AuthToken>(StorageService.TOKEN) || this.storageService.getSessionJson<AuthToken>(StorageService.TOKEN);
    const response = await this.put<Allergen>(URL + '/' + allergen.id, allergen, {
      authorization: token?.access_token,
      jsonBody: true,
    });
    return response.result.data;
  }

  async uploadAllergenIcon(allergenId: number, fileToUpload: any): Promise<Allergen | undefined> {
    const token = this.storageService.getLocalJson<AuthToken>(StorageService.TOKEN) || this.storageService.getSessionJson<AuthToken>(StorageService.TOKEN);
    const formData = new FormData();
    formData.append('file', fileToUpload, fileToUpload.name);
    const response = await this.post<Allergen>(URL + '/' + allergenId + '/icon/upload', formData, {
      authorization: token?.access_token,
    });
    return response.result.data;
  }

  async deleteAllergenIcon(allergenId: number): Promise<Allergen | undefined> {
    const token = this.storageService.getLocalJson<AuthToken>(StorageService.TOKEN) || this.storageService.getSessionJson<AuthToken>(StorageService.TOKEN);
    const formData = new FormData();
    const response = await this.delete<Allergen>(URL + '/' + allergenId + '/icon/delete', {
      authorization: token?.access_token,
    });
    return response.result.data;
  }

  async deleteAllergen(allergen: Allergen): Promise<Allergen | undefined> {
    const token = this.storageService.getLocalJson<AuthToken>(StorageService.TOKEN) || this.storageService.getSessionJson<AuthToken>(StorageService.TOKEN);
    const response = await this.delete<Allergen>(URL + '/' + allergen.id, {
      authorization: token?.access_token,
    });
    return response.result.data;
  }

}
