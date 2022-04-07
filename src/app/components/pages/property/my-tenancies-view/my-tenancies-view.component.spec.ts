import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyTenanciesViewComponent } from './my-tenancies-view.component';

describe('MyTenanciesViewComponent', () => {
  let component: MyTenanciesViewComponent;
  let fixture: ComponentFixture<MyTenanciesViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyTenanciesViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MyTenanciesViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
