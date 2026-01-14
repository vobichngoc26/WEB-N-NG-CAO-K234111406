import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Lunarconverter } from './lunarconverter';

describe('Lunarconverter', () => {
  let component: Lunarconverter;
  let fixture: ComponentFixture<Lunarconverter>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Lunarconverter]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Lunarconverter);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
