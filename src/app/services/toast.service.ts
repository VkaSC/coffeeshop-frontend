import { Injectable, TemplateRef } from '@angular/core';

export interface Toast {
  header: string;
  message?: string;
  delay?: number;
  link?: {
    text: string;
    url: string;
    local: boolean;
  }
}

export interface ToastInfo {
  header: string;
  message?: string;
  classname?: string;
  type: 'info' | 'success' | 'warning' | 'validation' | 'error';
  delay?: number;
  link?: {
    text: string;
    url: string;
    local: boolean;
  }
}

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  constructor() { }

  toasts: ToastInfo[] = [];

  info(toast: Toast) {
    this.show({
      header: toast.header,
      message: toast.message,
      type: 'info',
      classname: 'bg-info text-light',
      delay: toast.delay || 5000,
      link: toast.link,
    });
  }

  success(toast: Toast) {
    this.show({
      header: toast.header,
      message: toast.message,
      type: 'success',
      classname: 'bg-success text-light',
      delay: toast.delay || 5000,
      link: toast.link,
    });
  }

  validation(toast: Toast) {
    this.show({
      header: toast.header,
      message: toast.message,
      type: 'validation',
      classname: 'bg-light text-dark',
      delay: toast.delay || 5000,
      link: toast.link,
    });
  }

  warning(toast: Toast) {
    this.show({
      header: toast.header,
      message: toast.message,
      type: 'warning',
      classname: 'bg-warning text-dark',
      delay: toast.delay || 5000,
      link: toast.link,
    });
  }

  error(toast: Toast) {
    this.show({
      header: toast.header,
      message: toast.message,
      type: 'error',
      classname: 'bg-danger text-white',
      delay: toast.delay || 5000,
      link: toast.link,
    });
  }

  show(toast: ToastInfo) {
    this.toasts.push(toast);
  }

  remove(toast: ToastInfo) {
    this.toasts = this.toasts.filter(t => t !== toast);
  }

  clear() {
    this.toasts.splice(0, this.toasts.length);
  }
}
