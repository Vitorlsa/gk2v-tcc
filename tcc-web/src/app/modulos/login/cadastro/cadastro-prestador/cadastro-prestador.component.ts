import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cadastro-prestador',
  templateUrl: './cadastro-prestador.component.html',
  styleUrls: ['./cadastro-prestador.component.scss']
})
export class CadastroPrestadorComponent implements OnInit {

  constructor(private router:Router) { }

  public prestador:object = {
    nomeCompleto: "",
    username:"",
    senha:"",
    confirmaSenha:"",
    email:"",
    nascimento:"",
    sexo:"",
    cpf:"",
    telefone:"",
    cidade:"",
    competencias:"",
    comentario:"",
    termos:false, 
  };

  ngOnInit() {
    this.limparUsuario();
  }

salvar(){
  console.log(this.prestador);
}

cancelar(){
  this.router.navigate(['/cadastro']);
}


limparUsuario(){
  this.prestador     = {
    nomeCompleto: "",
    username:"",
    senha:"",
    confirmaSenha:"",
    email:"",
    nascimento:"",
    sexo:"",
    cpf:"",
    telefone:"",
    cidade:"",
    competencias:"",
    comentario:"",
    termos:false,
  };
}


}