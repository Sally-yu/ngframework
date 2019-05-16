import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UtilizationSummaryComponent } from './utilization-summary.component';

describe('UtilizationSummaryComponent', () => {
  let component: UtilizationSummaryComponent;
  let fixture: ComponentFixture<UtilizationSummaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UtilizationSummaryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UtilizationSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
