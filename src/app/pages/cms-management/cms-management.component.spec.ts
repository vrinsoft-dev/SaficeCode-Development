import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CmsManagement } from './cms-management.component';

describe('CmsManagement', () => {
  let component: CmsManagement;
  let fixture: ComponentFixture<CmsManagement>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CmsManagement ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CmsManagement);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
