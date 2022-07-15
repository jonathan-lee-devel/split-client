import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PropertyExpenseReportViewComponent } from './property-expense-report-view.component';

describe('PropertyExpenseReportViewComponent', () => {
  let component: PropertyExpenseReportViewComponent;
  let fixture: ComponentFixture<PropertyExpenseReportViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PropertyExpenseReportViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PropertyExpenseReportViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
