import { ComponentFixture, TestBed } from '@angular/core/testing';

import { YouAddComponent } from './you-add.component';

describe('YouAddComponent', () => {
  let component: YouAddComponent;
  let fixture: ComponentFixture<YouAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ YouAddComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(YouAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
