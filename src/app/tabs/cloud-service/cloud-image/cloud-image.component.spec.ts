import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CloudImageComponent } from './cloud-image.component';

describe('CloudImageComponent', () => {
  let component: CloudImageComponent;
  let fixture: ComponentFixture<CloudImageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CloudImageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CloudImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
