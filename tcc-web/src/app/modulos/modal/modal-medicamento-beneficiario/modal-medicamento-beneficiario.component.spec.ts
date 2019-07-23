import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalMedicamentoBeneficiarioComponent } from './modal-medicamento-beneficiario.component';

describe('ModalMedicamentoBeneficiarioComponent', () => {
  let component: ModalMedicamentoBeneficiarioComponent;
  let fixture: ComponentFixture<ModalMedicamentoBeneficiarioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalMedicamentoBeneficiarioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalMedicamentoBeneficiarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
