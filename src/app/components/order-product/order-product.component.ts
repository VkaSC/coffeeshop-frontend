import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import Product from 'src/app/models/product.model';

@Component({
  selector: 'app-order-product',
  templateUrl: './order-product.component.html',
  styleUrls: ['./order-product.component.css']
})
export class OrderProductComponent implements OnInit {

  @Input() allowAdd?: boolean;
  @Input() allowRemove?: boolean;
  @Input() showDetails?: boolean;
  @Input() product?: Product;
  @Input() index?: number;
  @Output() selectProduct: EventEmitter<Product> = new EventEmitter();
  @Output() removeProduct: EventEmitter<number> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  onClickHandler(event: any) {
    const source = event.target.name;
    if (source === 'add') {
      this.selectProduct.emit(this.product);
    } else if (source === 'remove') {
      this.removeProduct.emit(this.index);
    }
  }

}
