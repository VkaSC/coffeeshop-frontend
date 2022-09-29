import { Component, Input, OnInit } from '@angular/core';
import Allergen from 'src/app/models/allergen-model';

@Component({
  selector: 'app-allergen-ref',
  templateUrl: './allergen-ref.component.html',
  styleUrls: ['./allergen-ref.component.css']
})
export class AllergenRefComponent implements OnInit {

  @Input() allergen: Allergen = new Allergen();
  @Input() includeName: Boolean = false;
  @Input() big: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

}
