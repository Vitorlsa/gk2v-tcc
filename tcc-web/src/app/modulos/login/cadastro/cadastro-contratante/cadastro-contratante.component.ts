import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cadastro-contratante',
  templateUrl: './cadastro-contratante.component.html',
  styleUrls: ['./cadastro-contratante.component.scss']
})
export class CadastroContratanteComponent implements OnInit {

  constructor(private router:Router) { }

  public usuario:object;

  ngOnInit() {
    this.limparUsuario();
  }

salvar(){
  console.log(this.usuario);
}

cancelar(){
  this.router.navigate(['/cadastro']);
}


limparUsuario(){
  this.usuario = {
    nomeCompleto: "",
    username:"",
    senha:"",
    confimaSenha:"",
    email:"",
    nascimento:"",
    sexo:"",
    cpf:"",
    telefone:"",
    cidade:"",
    comentario:"",
    termos:false, 
  };
}


}