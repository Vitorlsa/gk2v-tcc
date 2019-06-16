import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalEditarMedicamentoComponent } from './modal-editar-medicamento.component';

describe('ModalEditarMedicamentoComponent', () => {
  let component: ModalEditarMedicamentoComponent;
  let fixture: ComponentFixture<ModalEditarMedicamentoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalEditarMedicamentoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalEditarMedicamentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
