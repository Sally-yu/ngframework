import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Model3dShowComponent } from './model3d-show.component';

describe('Model3dShowComponent', () => {
  let component: Model3dShowComponent;
  let fixture: ComponentFixture<Model3dShowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Model3dShowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Model3dShowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
