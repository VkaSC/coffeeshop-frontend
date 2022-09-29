import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import Order from 'src/app/models/order.model';

@Component({
  selector: 'app-historic-order',
  templateUrl: './historic-order.component.html',
  styleUrls: ['./historic-order.component.css']
})
export class HistoricOrderComponent implements OnInit {

  @Input() order: Order;
  @Output() reorder: EventEmitter<Order> = new EventEmitter();

  constructor() {
    this.order = new Order();
  }

  ngOnInit(): void {
  }

  onClickHandler(){
    this.reorder.emit(this.order);
  }

}
