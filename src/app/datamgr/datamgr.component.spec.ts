import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DatamgrComponent } from './datamgr.component';

describe('DatamgrComponent', () => {
  let component: DatamgrComponent;
  let fixture: ComponentFixture<DatamgrComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DatamgrComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DatamgrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
