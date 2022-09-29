import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllergenRefComponent } from './allergen-ref.component';

describe('AllergenRefComponent', () => {
  let component: AllergenRefComponent;
  let fixture: ComponentFixture<AllergenRefComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllergenRefComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AllergenRefComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
