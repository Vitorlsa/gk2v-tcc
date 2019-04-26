import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CadastroServiceService } from '../cadastro-service.service';
import { Paciente } from 'src/app/classes/paciente';

@Component({
  selector: 'app-cadastro-paciente',
  templateUrl: './cadastro-paciente.component.html',
  styleUrls: ['./cadastro-paciente.component.scss']
})
export class CadastroPacienteComponent implements OnInit {

  constructor(private http:HttpClient, private cadastroService: CadastroServiceService) { }

private api = "http://localhost:8080/"
private contratante = this.cadastroService.getContratantePaciente();
public paciente = new Paciente();

  ngOnInit() {
    this.limparPaciente();
  }


  salvar() {
    if (this.cadastroService.validaCadastro(this.paciente)) {
      this.http.post(this.api, this.paciente).subscribe(
        res => {
          alert("Cadastro salvo com sucesso");
          this.cadastroService.setContratantePaciente(this.paciente);
        },
        err => {
          console.log(err);
        });
    } else {
      alert("Campos preenchidos incorretamente");
    }
  }

  limparPaciente() {    
    this.paciente.nome= "";
    this.paciente.login= "";
    this.paciente.senha= "";
    this.paciente.confirmaSenha= "";
    this.paciente.email= "";
    this.paciente.datanascimento= null;
    this.paciente.sexo= 0;
    this.paciente.cpf= "";
    this.paciente.telefone= "";
    this.paciente.cidade="";
    this.paciente.estado= "";
    this.paciente.bairro= "";
    this.paciente.cep= "";
    this.paciente.rua= "";
    this.paciente.numero= "";
    this.paciente.complemento= "";
    this.paciente.comentario= "";
    this.paciente.termos= false;
  }
}
