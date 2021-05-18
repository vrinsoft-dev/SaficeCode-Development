import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MasterClientComponent } from './master-client.component';

describe('MasterClientComponent', () => {
  let component: MasterClientComponent;
  let fixture: ComponentFixture<MasterClientComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MasterClientComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MasterClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
