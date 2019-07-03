import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModelDesignComponent } from './model-design.component';

describe('ModelDesignComponent', () => {
  let component: ModelDesignComponent;
  let fixture: ComponentFixture<ModelDesignComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModelDesignComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModelDesignComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
