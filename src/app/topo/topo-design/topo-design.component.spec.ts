import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TopoDesignComponent } from './topo-design.component';

describe('TopoDesignComponent', () => {
  let component: TopoDesignComponent;
  let fixture: ComponentFixture<TopoDesignComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TopoDesignComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TopoDesignComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
