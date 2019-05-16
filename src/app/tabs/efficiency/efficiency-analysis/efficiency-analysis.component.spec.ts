import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EfficiencyAnalysisComponent } from './efficiency-analysis.component';

describe('EfficiencyAnalysisComponent', () => {
  let component: EfficiencyAnalysisComponent;
  let fixture: ComponentFixture<EfficiencyAnalysisComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EfficiencyAnalysisComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EfficiencyAnalysisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
