import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoricOrderComponent } from './historic-order.component';

describe('HistoricOrderComponent', () => {
  let component: HistoricOrderComponent;
  let fixture: ComponentFixture<HistoricOrderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HistoricOrderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HistoricOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
