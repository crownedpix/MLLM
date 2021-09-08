import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddmovComponent } from './addmov.component';

describe('AddmovComponent', () => {
  let component: AddmovComponent;
  let fixture: ComponentFixture<AddmovComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddmovComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddmovComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
