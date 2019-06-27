import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddDbMgrComponent } from './add-db-mgr.component';

describe('AddDbMgrComponent', () => {
  let component: AddDbMgrComponent;
  let fixture: ComponentFixture<AddDbMgrComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddDbMgrComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddDbMgrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
