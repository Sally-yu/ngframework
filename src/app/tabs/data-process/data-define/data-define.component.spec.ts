import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DataDefineComponent } from './data-define.component';

describe('DataDefineComponent', () => {
  let component: DataDefineComponent;
  let fixture: ComponentFixture<DataDefineComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DataDefineComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DataDefineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
