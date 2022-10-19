import { Component, Input, OnInit } from '@angular/core';
import OrderLine from 'src/app/models/order-line.model';

@Component({
  selector: 'app-order-line-list-item',
  templateUrl: './order-line-list-item.component.html',
  styleUrls: ['./order-line-list-item.component.css']
})
export class OrderLineListItemComponent implements OnInit {

  @Input() orderLine = new OrderLine();

  constructor() { }

  ngOnInit(): void {
  }

}
