import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PropertyManageExpensesComponent } from './property-manage-expenses.component';

describe('PropertyManageExpensesComponent', () => {
  let component: PropertyManageExpensesComponent;
  let fixture: ComponentFixture<PropertyManageExpensesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PropertyManageExpensesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PropertyManageExpensesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
