import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { clientReportComponent } from './client-report.component';

describe('clientReportComponent', () => {
  let component: clientReportComponent;
  let fixture: ComponentFixture<clientReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ clientReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(clientReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
