import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Utils } from 'src/app/libs/utils/utils.utils';
import Order from 'src/app/models/order.model';
import { MillisToEsDatePipe } from 'src/app/pipes/millis-to-es-date.pipe';
import { DialogMode, ModalComponent } from '../modal/modal.component';

@Component({
  selector: 'app-order-modal',
  templateUrl: './order-modal.component.html',
  styleUrls: ['./order-modal.component.css']
})
export class OrderModalComponent implements OnInit {

  @ViewChild('modal') private modal?: ModalComponent
  title = '';
  mode: DialogMode = DialogMode.New;
  order: Order = new Order();
  readOnly: boolean = false;
  form = new FormGroup({
    id: new FormControl<number>(0, [Validators.required]),
    date: new FormControl<string | null>(null, [Validators.required]),
    total: new FormControl<string>('', [Validators.required])
  });

  constructor() { }

  ngOnInit(): void {
  }

  open(mode: DialogMode, order?: Order) {
    this.mode = mode;
    this.setModel(order);
    this.setTitle();
    this.setReadability();
    return this.modal?.open(mode, {
      centered: true,
      size: 'lg'
    });
  }

  close(reset?: boolean) {
    this.modal?.close();
    if (reset) {
      this.reset();
    }
  }

  dismiss(reset?: boolean) {
    this.modal?.dismiss();
    if (reset) {
      this.reset();
    }
  }

  reset() {
    this.order = new Order();
    this.form.reset();
  }

  setTitle() {
    if (this.mode === DialogMode.New) {
      this.title = 'Nueva Orden';
    } else if (this.mode === DialogMode.View || this.mode === DialogMode.PartialView) {
      this.title = 'Detalles de la Orden: ' + this.order?.id;
    } else if (this.mode === DialogMode.Edit || this.mode === DialogMode.PartialEdit) {
      this.title = 'Editar Orden: ' + this.order?.id;
    }
  }

  setReadability() {
    this.readOnly = this.mode === DialogMode.View || this.mode === DialogMode.PartialView;
    this.readOnly ? this.form.controls.id.disable() : this.form.controls.id.enable();
    this.readOnly ? this.form.controls.date.disable() : this.form.controls.date.enable();
    this.readOnly ? this.form.controls.total.disable() : this.form.controls.total.enable();
  }

  setModel(order?: Order) {
    if (order) {
      this.order = new Order(Utils.clone(order));
      this.form.controls.id.setValue(this.order.id || 0);
      this.form.controls.date.setValue(new MillisToEsDatePipe().transform(this.order.date));
      this.form.controls.total.setValue('' + this.order.total + ' €');
    } else {
      this.form.controls.id.setValue(null);
      this.form.controls.date.setValue(null);
      this.form.controls.total.setValue('');
    }
  }

  onClickHandler(event: any) {
    const button = event.target.name;
    if (button === 'close') {
      this.dismiss(true);
    }
  }

}
