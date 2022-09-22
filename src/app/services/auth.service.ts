import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Rest } from '../libs/connection/rest.base';
import { Utils } from '../libs/utils/utils.utils';
import { AuthToken } from '../models/authToken.model';
import { HttpResponse } from '../models/httpResponse.model';
import User from '../models/user.model';
import { StorageService } from './storage.service';

const URL = '/api/auth'
const DEVICE_ID = 'device_id';
const TOKEN = 'token';

@Injectable({
  providedIn: 'root'
})
export class AuthService extends Rest {

  public authorized = false;
  public loggedUser?: User;

  constructor(
    httpClient: HttpClient,
    private storageService: StorageService
  ) {
    super(httpClient);
    const token = this.storageService.getLocalJson<AuthToken>(TOKEN);
    if(token){
      this.authorized = true;
      this.loggedUser = new User(token.user);
      /*this.refresh().then(() => {
        console.log('Token refreshed');
      }).catch(() => {
        console.log('Token refreshed');
      });*/
    }
  }

  async login(email: string, password: string, remember: boolean): Promise<AuthToken | undefined> {
    const response = await this.post<AuthToken>(URL + '/login', {
      email: email,
      password: password,
      remember: remember || false,
    }, {
      jsonBody: true,
    });
    this.storageService.setLocalJson(TOKEN, response.result.data);
    return response.result.data;
  }

  async logout() {
    const token = this.storageService.getLocalJson<AuthToken>(TOKEN);
    const response = await this.post<AuthToken>(URL + '/logout', {}, {
      authorization: token?.access_token,
    });
    this.storageService.removeLocal(TOKEN);
    return response.result.data;
  }

  async refresh() {
    const token = this.storageService.getLocalJson<AuthToken>(TOKEN);
    const response = await this.post<AuthToken>(URL + '/refresh', {}, {
      authorization: token?.access_token,
    });
    this.storageService.setLocalJson(TOKEN, response.result.data);
    return response.result.data;
  }

  async recovery(token: string, password: string) {
    const response = await this.put<AuthToken>(URL + '/recovering/' + token, {
      password: password
    });
    return response.result.data;
  }

  async activate(token: string) {
    const response = await this.put<AuthToken>(URL + '/activation/' + token, {});
    return response.result.data;
  }

  async revoke(token: string) {
    const response = await this.delete<AuthToken>(URL + '/revoking/' + token);
    return response.result.data;
  }

  async sendActivationEmail(email: string) {
    const response = await this.post<AuthToken>(URL + '/activate/email', {
      email: email
    });
    return response.result.data;
  }

  async sendRecoveryEmail(email: string) {
    const response = await this.post<AuthToken>(URL + '/recovery/email', {
      email: email
    });
    return response.result.data;
  }



  createDeviceId(overrite?: boolean) {
    if (!this.storageService.getLocal(DEVICE_ID) || overrite) {
      this.storageService.setLocal(DEVICE_ID, Utils.createUUID());
    }
  }

  getDeviceId() {
    this.createDeviceId();
    return this.storageService.getLocal(DEVICE_ID) || '';
  }
}
