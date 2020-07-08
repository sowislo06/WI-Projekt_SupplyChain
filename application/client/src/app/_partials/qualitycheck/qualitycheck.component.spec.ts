import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QualitycheckComponent } from './qualitycheck.component';

describe('QualitycheckComponent', () => {
  let component: QualitycheckComponent;
  let fixture: ComponentFixture<QualitycheckComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QualitycheckComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QualitycheckComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
