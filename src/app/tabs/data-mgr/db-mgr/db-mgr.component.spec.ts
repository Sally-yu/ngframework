import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DbMgrComponent } from './db-mgr.component';

describe('DbMgrComponent', () => {
  let component: DbMgrComponent;
  let fixture: ComponentFixture<DbMgrComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DbMgrComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DbMgrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
