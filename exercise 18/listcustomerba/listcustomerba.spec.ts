import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Listcustomerba } from './listcustomerba';

describe('Listcustomerba', () => {
  let component: Listcustomerba;
  let fixture: ComponentFixture<Listcustomerba>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Listcustomerba]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Listcustomerba);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
