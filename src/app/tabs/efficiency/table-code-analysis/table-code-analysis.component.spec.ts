import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TableCodeAnalysisComponent } from './table-code-analysis.component';

describe('TableCodeAnalysisComponent', () => {
  let component: TableCodeAnalysisComponent;
  let fixture: ComponentFixture<TableCodeAnalysisComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TableCodeAnalysisComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TableCodeAnalysisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
