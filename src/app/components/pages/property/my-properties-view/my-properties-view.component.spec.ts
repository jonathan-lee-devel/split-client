import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyPropertiesViewComponent } from './my-properties-view.component';

describe('MyPropertiesViewComponent', () => {
  let component: MyPropertiesViewComponent;
  let fixture: ComponentFixture<MyPropertiesViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyPropertiesViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MyPropertiesViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
