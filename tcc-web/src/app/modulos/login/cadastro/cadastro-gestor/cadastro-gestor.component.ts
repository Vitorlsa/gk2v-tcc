import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CadastroServiceService } from '../cadastro-service.service';

@Component({
  selector: 'app-cadastro-gestor',
  templateUrl: './cadastro-gestor.component.html',
  styleUrls: ['./cadastro-gestor.component.scss']
})
export class CadastroGestorComponent implements OnInit {
  
  constructor(private router: Router, private http: HttpClient, private cadastroService:CadastroServiceService  ) { }

  public api = "http://localhost:8080/api/gestor/cadastrar";

  public gestor = {
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
    historico: "",
    cursos: "",
    comentario: "",
    termos: false,
  };

  ngOnInit() {
    this.limparUsuario();
  }

  salvar() {
    if (this.cadastroService.validaCadastro(this.gestor)) {
      this.http.post(this.api, this.gestor).subscribe(data => {
        // console.log(data);
        alert("Cadastro salvo com sucesso");
      })
    } else {
      alert("Campos preenchidos incorretamente");
    }
  }

  setSexo(event) {
    this.gestor.sexo = event.target.value;
  }

  setTermos(event) {
    this.gestor.termos = event.target.value;
  }

  cancelar() {
    this.router.navigate(['/cadastro']);
  }


  limparUsuario() {
    this.gestor = {
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
      historico: "",
      cursos: "",
      comentario: "",
      termos: false,
    };
  }


}