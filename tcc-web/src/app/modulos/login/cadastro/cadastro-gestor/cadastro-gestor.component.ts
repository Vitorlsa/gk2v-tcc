import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cadastro-gestor',
  templateUrl: './cadastro-gestor.component.html',
  styleUrls: ['./cadastro-gestor.component.scss']
})
export class CadastroGestorComponent implements OnInit {

  constructor(private router:Router) { }

  public gestor:object = {
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
    historico:"",
    cursos:"",
    comentario:"",
    termos:false, 
  };

  ngOnInit() {
    this.limparUsuario();
  }

salvar(){
  console.log(this.gestor);
}

cancelar(){
  this.router.navigate(['/cadastro']);
}


limparUsuario(){
  this.gestor = {
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
    historico:"",
    cursos:"",
    comentario:"",
    termos:false,
  };
}


}