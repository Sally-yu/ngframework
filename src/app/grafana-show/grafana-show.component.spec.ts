import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GrafanaShowComponent } from './grafana-show.component';

describe('GrafanaShowComponent', () => {
  let component: GrafanaShowComponent;
  let fixture: ComponentFixture<GrafanaShowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GrafanaShowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GrafanaShowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
