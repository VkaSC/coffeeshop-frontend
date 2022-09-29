import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import Allergen from 'src/app/models/allergen-model';

@Component({
  selector: 'app-allergen-list-item',
  templateUrl: './allergen-list-item.component.html',
  styleUrls: ['./allergen-list-item.component.css']
})
export class AllergenListItemComponent implements OnInit {

  @Input() allergen: Allergen = new Allergen();
  @Input() allowRemove: Boolean = false;
  @Input() allowAdd: Boolean = false;
  @Output() onAdd: EventEmitter<Allergen> = new EventEmitter();
  @Output() onRemove: EventEmitter<Allergen> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  onClickHandler(event: any){
    const source = event.target.name;
    if(source === 'add'){
      this.onAdd.emit(this.allergen);
    } else {
      this.onRemove.emit(this.allergen);
    }
  }

}
