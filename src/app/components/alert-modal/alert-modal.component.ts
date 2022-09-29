import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { ModalComponent } from '../modal/modal.component';

export interface AlertOptions {
  title: string,
  message?: string,
  isDanger?: boolean,
  action?: string,
  acceptLabel?: string,
  cancelLabel?: string,
  lastState?: string
  data?: any,
}

@Component({
  selector: 'app-alert-modal',
  templateUrl: './alert-modal.component.html',
  styleUrls: ['./alert-modal.component.css']
})
export class AlertModalComponent implements OnInit {

  @ViewChild('modal') private modal?: ModalComponent
  opened: boolean = false;

  @Output() onAccept: EventEmitter<AlertOptions> = new EventEmitter();
  @Output() onCancel: EventEmitter<AlertOptions> = new EventEmitter();

  @Input() title: string = '';
  @Input() message?: string = '';
  @Input() icon?: string = '';
  @Input() isDanger?: boolean = false;
  @Input() acceptLabel: string = 'Accept';
  @Input() cancelLabel: string = 'Cancel';
  @Input() options?: AlertOptions;

  buttonType: string = 'primary';

  constructor() { }

  ngOnInit(): void {
    if (this.isDanger) {
      this.buttonType = 'primary';
    } else {
      this.buttonType = 'danger';
    }
  }

  onClickHandler(event: any): void {
    const button = event.target.name;
    if (button === 'cancel') {
      this.dismiss();
    } else {
      this.close();
    }
  }

  open(options: AlertOptions) {
    this.title = options.title;
    this.message = options.message;
    this.isDanger = options.isDanger || false;
    this.acceptLabel = options.acceptLabel || 'Accept';
    this.cancelLabel = options.cancelLabel || 'Cancel';
    this.options = options;
    this.opened = true;
    return this.modal?.open(undefined, { centered: true });
  }

  close() {
    if (this.modal) {
      this.opened = false;
      this.modal.close();
    }
  }

  dismiss() {
    if (this.modal) {
      this.opened = false;
      this.modal.dismiss();
    }
  }

  isOpen() {
    return this.opened;
  }

}
