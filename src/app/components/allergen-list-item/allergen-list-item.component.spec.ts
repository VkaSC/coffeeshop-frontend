import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllergenListItemComponent } from './allergen-list-item.component';

describe('AllergenListItemComponent', () => {
  let component: AllergenListItemComponent;
  let fixture: ComponentFixture<AllergenListItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllergenListItemComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AllergenListItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
