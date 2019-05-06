import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DataprocessComponent } from './dataprocess.component';

describe('DataprocessComponent', () => {
  let component: DataprocessComponent;
  let fixture: ComponentFixture<DataprocessComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DataprocessComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DataprocessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
