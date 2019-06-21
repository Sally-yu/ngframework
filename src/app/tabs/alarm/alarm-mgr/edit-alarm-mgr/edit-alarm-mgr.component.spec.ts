import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditAlarmMgrComponent } from './edit-alarm-mgr.component';

describe('EditAlarmMgrComponent', () => {
  let component: EditAlarmMgrComponent;
  let fixture: ComponentFixture<EditAlarmMgrComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditAlarmMgrComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditAlarmMgrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
