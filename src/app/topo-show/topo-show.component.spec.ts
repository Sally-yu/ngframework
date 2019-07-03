import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TopoShowComponent } from './topo-show.component';

describe('TopoShowComponent', () => {
  let component: TopoShowComponent;
  let fixture: ComponentFixture<TopoShowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TopoShowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TopoShowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
