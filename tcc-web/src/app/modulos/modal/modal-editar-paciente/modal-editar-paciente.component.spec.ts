import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalEditarPacienteComponent } from './modal-editar-paciente.component';

describe('ModalEditarPacienteComponent', () => {
  let component: ModalEditarPacienteComponent;
  let fixture: ComponentFixture<ModalEditarPacienteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalEditarPacienteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalEditarPacienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
