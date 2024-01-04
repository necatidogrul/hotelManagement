import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DegerYakalamaComponent } from './deger-yakalama.component';

describe('DegerYakalamaComponent', () => {
  let component: DegerYakalamaComponent;
  let fixture: ComponentFixture<DegerYakalamaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DegerYakalamaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DegerYakalamaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
