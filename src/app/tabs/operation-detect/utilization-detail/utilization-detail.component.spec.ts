import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UtilizationDetailComponent } from './utilization-detail.component';

describe('UtilizationDetailComponent', () => {
  let component: UtilizationDetailComponent;
  let fixture: ComponentFixture<UtilizationDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UtilizationDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UtilizationDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
