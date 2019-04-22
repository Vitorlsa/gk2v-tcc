import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CadastroServiceService } from '../cadastro-service.service';

@Component({
  selector: 'app-cadastro-prestador',
  templateUrl: './cadastro-prestador.component.html',
  styleUrls: ['./cadastro-prestador.component.scss']
})
export class CadastroPrestadorComponent implements OnInit {

  constructor(private router: Router, private http: HttpClient, private cadastroService: CadastroServiceService) { }


  public api = "http://localhost:8080/api/prestadordeservico/cadastrar";
  public prestador = {
    nome: "",
    login: "",
    senha: "",
    confirmaSenha: "",
    email: "",
    dataNascimento: "",
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
    competencias: "",
    comentario: "",
    termos: false,
  };



  ngOnInit() {
    this.limparUsuario();
  }

  salvar() {
    if (this.cadastroService.validaCadastro(this.prestador)) {
      this.http.post(this.api, this.prestador).subscribe(data => {
        // console.log(data);
        alert("Cadastro salvo com sucesso");
      })
    } else {
      alert("Campos preenchidos incorretamente");
    }
  }

  setSexo(event) {
    this.prestador.sexo = event.target.value;
  }

  setTermos(event) {
    this.prestador.termos = event.target.value;
  }

  cancelar() {
    this.router.navigate(['/cadastro']);
  }


  limparUsuario() {
    this.prestador = {
      nome: "",
      login: "",
      senha: "",
      confirmaSenha: "",
      email: "",
      dataNascimento: "",
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
      competencias: "",
      comentario: "",
      termos: false,
    };
  }

  voltar(){
    this.router.navigate(['/cadastro']);
  }


}