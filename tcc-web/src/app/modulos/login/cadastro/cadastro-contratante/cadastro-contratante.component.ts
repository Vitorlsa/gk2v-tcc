import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CadastroServiceService } from '../cadastro-service.service';

@Component({
  selector: 'app-cadastro-contratante',
  templateUrl: './cadastro-contratante.component.html',
  styleUrls: ['./cadastro-contratante.component.scss']
})
export class CadastroContratanteComponent implements OnInit {

  constructor(private router: Router, private http: HttpClient, private cadastroService: CadastroServiceService) { }

  //// precisa criar os types com typescript senao nao faz o bind na hora do post
  public usuario: {
    nome: "",
    login: "",
    senha: "",
    confirmaSenha: "",
    email: "",
    datanascimento: "",
    sexo: 0,
    cpf: "",
    telefone: "",
    cidade: "",
    comentario: "",
    termos: false,
    estado: "",
    bairro: "",
    cep: "",
    rua: "",
    numero: "",
    complemento: ""

  };
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
    this.usuario.sexo = event.target.value;
  }

  setTermos(event) {
    this.usuario.termos = event.target.value;
  }

  salvar() {
    if (this.cadastroService.validaCadastro(this.usuario)) {
      this.http.post(this.api, this.usuario).subscribe(
        res => {
          alert("Cadastro salvo com sucesso");
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
    this.usuario = {
      nome: "",
      login: "",
      senha: "",
      confirmaSenha: "",
      email: "",
      datanascimento: "",
      sexo: 0,
      cpf: "",
      telefone: "",
      cidade: "",
      estado: "",
      bairro: "",
      cep: "",
      rua: "",
      numero: "",
      complemento: "",
      comentario: "",
      termos: false,
    };
  }

  voltar(){
    this.router.navigate(['/cadastro']);
  }

}