import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UsageAnalysisComponent } from './usage-analysis.component';

describe('UsageAnalysisComponent', () => {
  let component: UsageAnalysisComponent;
  let fixture: ComponentFixture<UsageAnalysisComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UsageAnalysisComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsageAnalysisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
