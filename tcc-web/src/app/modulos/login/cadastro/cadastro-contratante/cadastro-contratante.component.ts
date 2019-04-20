import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-cadastro-contratante',
  templateUrl: './cadastro-contratante.component.html',
  styleUrls: ['./cadastro-contratante.component.scss']
})
export class CadastroContratanteComponent implements OnInit {

  constructor(private router: Router, private http: HttpClient) { }

  public usuario = {
    nomeCompleto: "",
    username: "",
    senha: "",
    confimaSenha: "",
    email: "",
    nascimento: "",
    sexo: null,
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
    termos: null,
  };
  public api = "";


  ngOnInit() {
    this.limparUsuario();
  }

  salvar() {

    //[(ngModel)]="usuario.termos"
    //    this.usuario.termos = op
    console.log(this.usuario);
    this.http.post(this.api, this.usuario).subscribe(data => {
      console.log(data);
    })
  }

  setSexo(event) {
    this.usuario.sexo = event.target.value;
  }

  setTermos(event) {
    this.usuario.termos = event.target.value;
  }

  cancelar() {
    this.router.navigate(['/cadastro']);
  }


  limparUsuario() {
    this.usuario = {
      nomeCompleto: "",
      username: "",
      senha: "",
      confimaSenha: "",
      email: "",
      nascimento: "",
      sexo: null,
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
      termos: null,
    };
  }


}