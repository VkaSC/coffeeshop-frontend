import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderLineListItemComponent } from './order-line-list-item.component';

describe('OrderLineListItemComponent', () => {
  let component: OrderLineListItemComponent;
  let fixture: ComponentFixture<OrderLineListItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrderLineListItemComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrderLineListItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
