import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-modal-editar-paciente',
  templateUrl: './modal-editar-paciente.component.html',
  styleUrls: ['./modal-editar-paciente.component.scss']
})
export class ModalEditarPacienteComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    console.log("modal editar paciente");
  }

}
