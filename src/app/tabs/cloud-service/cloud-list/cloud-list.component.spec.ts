import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CloudListComponent } from './cloud-list.component';

describe('CloudListComponent', () => {
  let component: CloudListComponent;
  let fixture: ComponentFixture<CloudListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CloudListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CloudListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
