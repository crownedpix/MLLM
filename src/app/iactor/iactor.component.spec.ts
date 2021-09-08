import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IactorComponent } from './iactor.component';

describe('IactorComponent', () => {
  let component: IactorComponent;
  let fixture: ComponentFixture<IactorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IactorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IactorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
