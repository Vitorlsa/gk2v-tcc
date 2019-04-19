import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-cadastro-prestador',
  templateUrl: './cadastro-prestador.component.html',
  styleUrls: ['./cadastro-prestador.component.scss']
})
export class CadastroPrestadorComponent implements OnInit {

  constructor(private router: Router, private http: HttpClient) { }


  public api = "";
  public prestador: object;

  ngOnInit() {
    this.limparUsuario();
  }

  salvar() {
    console.log(this.prestador);
    this.http.post(this.api, this.prestador).subscribe(data => {
      console.log(data);
    })
  }

  cancelar() {
    this.router.navigate(['/cadastro']);
  }


  limparUsuario() {
    this.prestador = {
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
      estado:"",
      bairro:"",
      cep:"",
      rua:"",
      numero:"",
      complemento:"",
      competencias: "",
      comentario: "",
      termos: false,
    };
  }


}