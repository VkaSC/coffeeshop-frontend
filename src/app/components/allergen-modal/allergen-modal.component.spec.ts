import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllergenModalComponent } from './allergen-modal.component';

describe('AllergenModalComponent', () => {
  let component: AllergenModalComponent;
  let fixture: ComponentFixture<AllergenModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllergenModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AllergenModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
