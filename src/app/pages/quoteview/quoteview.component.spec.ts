import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuoteviewComponent } from './quoteview.component';

describe('QuoteviewComponent', () => {
  let component: QuoteviewComponent;
  let fixture: ComponentFixture<QuoteviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuoteviewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QuoteviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
