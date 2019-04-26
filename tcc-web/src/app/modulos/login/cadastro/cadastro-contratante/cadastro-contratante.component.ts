import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CadastroServiceService } from '../cadastro-service.service';
import { Usuario } from 'src/app/classes/usuario';

@Component({
  selector: 'app-cadastro-contratante',
  templateUrl: './cadastro-contratante.component.html',
  styleUrls: ['./cadastro-contratante.component.scss']
})
export class CadastroContratanteComponent implements OnInit {

  constructor(private router: Router, private http: HttpClient, private cadastroService: CadastroServiceService) { }

public usuario = new Usuario();

  public api = "http://localhost:8080/api/contratante/cadastrar";
  public termos = [{
    valor: true,
    name: 'Aceito'
  }, {
    valor: false,
    name: "Não aceito",
  }
  ]

  ngOnInit() {
    this.limparUsuario();
  }


  setSexo(event) {
    this.usuario.setSexo(event.target.value);
  }

  setTermos(event) {
    this.usuario.setTermos(event.target.value);
  }

  salvar() {
    if (this.cadastroService.validaCadastro(this.usuario)) {
      this.http.post(this.api, this.usuario).subscribe(
        res => {
          alert("Cadastro salvo com sucesso");
          this.cadastroService.setContratantePaciente(this.usuario);
        },
        err => {
          console.log(err);
        });
    } else {
      alert("Campos preenchidos incorretamente");
    }
  }


  cancelar() {
    this.router.navigate(['/cadastro']);
  }


  limparUsuario() {    
    this.usuario.nome= "";
    this.usuario.login= "";
    this.usuario.senha= "";
    this.usuario.confirmaSenha= "";
    this.usuario.email= "";
    this.usuario.datanascimento= null;
    this.usuario.sexo= 0;
    this.usuario.cpf= "";
    this.usuario.telefone= "";
    this.usuario.cidade="";
    this.usuario.estado= "";
    this.usuario.bairro= "";
    this.usuario.cep= "";
    this.usuario.rua= "";
    this.usuario.numero= "";
    this.usuario.complemento= "";
    this.usuario.comentario= "";
    this.usuario.termos= false;
  }

  voltar() {
    this.router.navigate(['/cadastro']);
  }

}