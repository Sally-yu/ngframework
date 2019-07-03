import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TopoMgrComponent } from './topo-mgr.component';

describe('TopoMgrComponent', () => {
  let component: TopoMgrComponent;
  let fixture: ComponentFixture<TopoMgrComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TopoMgrComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TopoMgrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
