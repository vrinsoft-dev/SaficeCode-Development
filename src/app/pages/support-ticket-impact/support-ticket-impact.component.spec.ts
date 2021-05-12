import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SupportTicketImpactComponent } from './support-ticket-impact.component';

describe('SupportTicketImpactComponent', () => {
  let component: SupportTicketImpactComponent;
  let fixture: ComponentFixture<SupportTicketImpactComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SupportTicketImpactComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SupportTicketImpactComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
