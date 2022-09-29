import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Rest, SearchOptions } from '../libs/connection/rest.base';
import { AuthToken } from '../models/authToken.model';
import User from '../models/user.model';
import { StorageService } from './storage.service';

const URL = '/api/user'

@Injectable({
  providedIn: 'root'
})
export class UsersService extends Rest {

  constructor(httpClient: HttpClient, private storageService: StorageService) {
    super(httpClient)
  }

  async listUsers(searchOptions?: SearchOptions): Promise<User[] | undefined> {
    const response = await this.get<User[]>(URL + this.getSearchOptions(searchOptions), {
      authorization: this.storageService.getLocalJson<AuthToken>(StorageService.TOKEN)?.access_token,
    });
    return response.result.data;
  }

  async getUser(userId: string): Promise<User | undefined> {
    const response = await this.get<User>(URL + '/' + userId, {
      authorization: this.storageService.getLocalJson<AuthToken>(StorageService.TOKEN)?.access_token,
    });
    return response.result.data;
  }

  async addUser(user: User): Promise<User | undefined> {
    const response = await this.post<User>(URL, user, {
      authorization: this.storageService.getLocalJson<AuthToken>(StorageService.TOKEN)?.access_token,
      jsonBody: true,
    });
    return response.result.data;
  }

  async updateUser(user: User): Promise<User | undefined> {
    const response = await this.put<User>(URL + '/' + user.id, user, {
      authorization: this.storageService.getLocalJson<AuthToken>(StorageService.TOKEN)?.access_token,
      jsonBody: true,
    });
    return response.result.data;
  }

  async deleteUser(user: User): Promise<User | undefined> {
    const response = await this.delete<User>(URL + '/' + user.id, {
      authorization: this.storageService.getLocalJson<AuthToken>(StorageService.TOKEN)?.access_token,
    });
    return response.result.data;
  }

}
