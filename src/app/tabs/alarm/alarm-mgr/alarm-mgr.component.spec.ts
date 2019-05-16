import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlarmMgrComponent } from './alarm-mgr.component';

describe('AlarmMgrComponent', () => {
  let component: AlarmMgrComponent;
  let fixture: ComponentFixture<AlarmMgrComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlarmMgrComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlarmMgrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
