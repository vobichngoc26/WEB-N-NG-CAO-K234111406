import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Paymentmomo } from './paymentmomo';

describe('Paymentmomo', () => {
  let component: Paymentmomo;
  let fixture: ComponentFixture<Paymentmomo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Paymentmomo]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Paymentmomo);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
