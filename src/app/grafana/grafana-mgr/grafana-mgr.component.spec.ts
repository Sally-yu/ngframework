import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GrafanaMgrComponent } from './grafana-mgr.component';

describe('GrafanaMgrComponent', () => {
  let component: GrafanaMgrComponent;
  let fixture: ComponentFixture<GrafanaMgrComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GrafanaMgrComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GrafanaMgrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
