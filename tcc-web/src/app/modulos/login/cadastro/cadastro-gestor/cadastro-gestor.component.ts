import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-cadastro-gestor',
  templateUrl: './cadastro-gestor.component.html',
  styleUrls: ['./cadastro-gestor.component.scss']
})
export class CadastroGestorComponent implements OnInit {

  constructor(private router: Router, private http: HttpClient) { }

  public api = "";

  public gestor = {
    nomeCompleto: "",
    username: "",
    senha: "",
    confirmaSenha: "",
    email: "",
    nascimento: "",
    sexo: "",
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
    console.log(this.gestor);
    this.http.post(this.api, this.gestor).subscribe(data => {
      console.log(data);
    })
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
      nomeCompleto: "",
      username: "",
      senha: "",
      confirmaSenha: "",
      email: "",
      nascimento: "",
      sexo: "",
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