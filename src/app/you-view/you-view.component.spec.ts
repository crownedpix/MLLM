import { ComponentFixture, TestBed } from '@angular/core/testing';

import { YouViewComponent } from './you-view.component';

describe('YouViewComponent', () => {
  let component: YouViewComponent;
  let fixture: ComponentFixture<YouViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ YouViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(YouViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
