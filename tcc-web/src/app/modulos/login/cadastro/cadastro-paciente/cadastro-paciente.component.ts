import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CadastroServiceService } from '../cadastro-service.service';

@Component({
  selector: 'app-cadastro-paciente',
  templateUrl: './cadastro-paciente.component.html',
  styleUrls: ['./cadastro-paciente.component.scss']
})
export class CadastroPacienteComponent implements OnInit {

  constructor(private http:HttpClient, private cadastroService: CadastroServiceService) { }

private api = "http://localhost:8080/"
private contratante = this.cadastroService.getContratantePaciente();
public paciente:object;

  ngOnInit() {
  }



}
