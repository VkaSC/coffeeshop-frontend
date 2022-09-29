import { Injectable } from '@angular/core';
import { AlertModalComponent, AlertOptions } from '../components/alert-modal/alert-modal.component';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  modal?: AlertModalComponent;

  constructor() { }

  setModal(modal?: AlertModalComponent){
    this.modal = modal;
  }

  alert(options: AlertOptions){
    return this.modal?.open(options);
  }

  closeAlert(){
    this.modal?.dismiss();
  }
}
