import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodaysCheckoutComponent } from './todays-checkout.component';

describe('TodaysCheckoutComponent', () => {
  let component: TodaysCheckoutComponent;
  let fixture: ComponentFixture<TodaysCheckoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TodaysCheckoutComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TodaysCheckoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
