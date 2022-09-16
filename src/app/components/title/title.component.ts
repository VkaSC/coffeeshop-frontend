import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-title',
  templateUrl: './title.component.html',
  styleUrls: ['./title.component.css']
})
export class TitleComponent implements OnInit {

  @Input() title = 'Page Title';
  @Input() big = false;

  get getClass(){
    return this.big ? 'big-title' : 'title';
  }

  constructor() { }

  ngOnInit(): void {
  }

}
