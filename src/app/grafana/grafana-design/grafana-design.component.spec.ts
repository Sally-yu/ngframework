import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GrafanaDesignComponent } from './grafana-design.component';

describe('GrafanaDesignComponent', () => {
  let component: GrafanaDesignComponent;
  let fixture: ComponentFixture<GrafanaDesignComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GrafanaDesignComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GrafanaDesignComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
