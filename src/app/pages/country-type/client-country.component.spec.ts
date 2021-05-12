import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientCountryComponent } from './client-country.component';

describe('ClientCountryComponent', () => {
  let component: ClientCountryComponent;
  let fixture: ComponentFixture<ClientCountryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClientCountryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientCountryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
