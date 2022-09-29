import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  public static readonly DEVICE_ID = 'device_id';
  public static readonly TOKEN = 'token';

  private localStorage: Storage;
  private sessionStorage: Storage;

  constructor() {
    this.localStorage = window.localStorage;
    this.sessionStorage = window.sessionStorage;
  }

  getLocal(key: string): string | null {
    if (this.isLocalStorageSupported()) {
      return this.localStorage.getItem(key);
    }
    return null;
  }

  getLocalJson<T>(key: string): T | null {
    if (this.isLocalStorageSupported() && this.localStorage.getItem(key)) {
      return JSON.parse(this.localStorage.getItem(key) || "") as T;
    }
    return null;
  }

  setLocal(key: string, value: string): boolean {
    if (this.isLocalStorageSupported()) {
      this.localStorage.setItem(key, value);
      return true;
    }
    return false;
  }

  setLocalJson(key: string, value: any): boolean {
    if (this.isLocalStorageSupported()) {
      this.localStorage.setItem(key, JSON.stringify(value));
      return true;
    }
    return false;
  }

  removeLocal(key: string): boolean {
    if (this.isLocalStorageSupported()) {
      this.localStorage.removeItem(key);
      return true;
    }
    return false;
  }

  getSession(key: string): string | null {
    if (this.isSessionStorageSupported()) {
      return this.sessionStorage.getItem(key);
    }
    return null;
  }

  setSession(key: string, value: string): boolean {
    if (this.isSessionStorageSupported()) {
      this.sessionStorage.setItem(key, value);
      return true;
    }
    return false;
  }

  removeSession(key: string): boolean {
    if (this.isSessionStorageSupported()) {
      this.sessionStorage.removeItem(key);
      return true;
    }
    return false;
  }

  isLocalStorageSupported(): boolean {
    return !!this.localStorage;
  }

  isSessionStorageSupported(): boolean {
    return !!this.sessionStorage;
  }

}
