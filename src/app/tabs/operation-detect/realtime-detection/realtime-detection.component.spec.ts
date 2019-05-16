import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RealtimeDetectionComponent } from './realtime-detection.component';

describe('RealtimeDetectionComponent', () => {
  let component: RealtimeDetectionComponent;
  let fixture: ComponentFixture<RealtimeDetectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RealtimeDetectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RealtimeDetectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
