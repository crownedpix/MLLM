import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImovComponent } from './imov.component';

describe('ImovComponent', () => {
  let component: ImovComponent;
  let fixture: ComponentFixture<ImovComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImovComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ImovComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
