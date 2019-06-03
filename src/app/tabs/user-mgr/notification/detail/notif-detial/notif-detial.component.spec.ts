import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NotifDetialComponent } from './notif-detial.component';

describe('NotifDetialComponent', () => {
  let component: NotifDetialComponent;
  let fixture: ComponentFixture<NotifDetialComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NotifDetialComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NotifDetialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
