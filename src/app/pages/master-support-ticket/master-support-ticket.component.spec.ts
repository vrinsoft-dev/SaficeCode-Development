import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MasterSupportTicketComponent } from './master-support-ticket.component';

describe('MasterSupportTicketComponent', () => {
  let component: MasterSupportTicketComponent;
  let fixture: ComponentFixture<MasterSupportTicketComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MasterSupportTicketComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MasterSupportTicketComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
