import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QualitymanagementComponent } from './qualitymanagement.component';

describe('QualitymanagementComponent', () => {
  let component: QualitymanagementComponent;
  let fixture: ComponentFixture<QualitymanagementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QualitymanagementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QualitymanagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
