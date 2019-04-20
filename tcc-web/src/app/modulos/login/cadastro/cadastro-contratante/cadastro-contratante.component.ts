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

  //// precisa criar os types com typescript senao nao faz o bind na hora do post
  public usuario:  {
    nome: "",
    login: "",
    senha: "",
    confimaSenha: "",
    email: "",
    datanascimento: "",
    sexo: null,
    cpf: "",
    telefone: "",
    cidade: "",
    comentario: "",
    termos: null,
  };
  public api = "http://localhost:8080/api/contratante/cadastrar";
  public termos = [{
    valor:true,
    name:'Aceito'
  },{
    valor:false,
    name:"Não aceito",
  }
]

  ngOnInit() {
    this.limparUsuario();
  }

  salvar() {

    //[(ngModel)]="usuario.termos"
//    this.usuario.termos = op=
    this.http.post(this.api,  {nome: this.usuario.nome, login : this.usuario.login, senha : this.usuario.senha, email : this.usuario.email,
      datanascimento: this.usuario.datanascimento, cpf: this.usuario.cpf, telefone : this.usuario.telefone,
      cidade : this.usuario.cidade, comentario : this.usuario.comentario }).subscribe(
      res => {

      },
      err => {
        console.log(err); 
      });
  }

  cancelar() {
    this.router.navigate(['/cadastro']);
  }


  limparUsuario() {
    this.usuario = {
      nome: "",
      login: "",
      senha: "",
      confimaSenha: "",
      email: "",
      datanascimento: "",
      sexo: null,
      cpf: "",
      telefone: "",
      cidade: "",
      comentario: "",
      termos: null,
    };
  }


}