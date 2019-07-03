import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModelMgrComponent } from './model-mgr.component';

describe('ModelMgrComponent', () => {
  let component: ModelMgrComponent;
  let fixture: ComponentFixture<ModelMgrComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModelMgrComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModelMgrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
