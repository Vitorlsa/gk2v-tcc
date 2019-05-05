import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CadastroServiceService } from '../cadastro-service.service';
import { Gestor } from 'src/app/classes/gestor';

@Component({
  selector: 'app-cadastro-gestor',
  templateUrl: './cadastro-gestor.component.html',
  styleUrls: ['./cadastro-gestor.component.scss']
})
export class CadastroGestorComponent implements OnInit {
  
  constructor(private router: Router, private http: HttpClient, private cadastroService:CadastroServiceService  ) {
    this.gestor.sexo = 3;
   }

  public api = "http://localhost:8080/api/gestor/cadastrar";

  // public gestor = {
  //   nome: "",
  //   login: "",
  //   senha: "",
  //   confirmaSenha: "",
  //   email: "",
  //   dataNascimento: "",
  //   sexo: 0,
  //   cpf: "",
  //   telefone: "",
  //   cidade: "",
  //   estado: "",
  //   bairro: "",
  //   cep: "",
  //   rua: "",
  //   numero: "",
  //   complemento: "",
  //   historico: "",
  //   cursos: "",
  //   comentario: "",
  //   termos: false,
  // };


public gestor = new Gestor();


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
    this.gestor.setSexo(event.target.value);
  }

  setTermos(event) {
    this.gestor.setTermos(event.target.value);
  }

  cancelar() {
    this.router.navigate(['/cadastro']);
  }


  limparUsuario() {
    this.gestor.nome= "";
    this.gestor.login= "";
    this.gestor.senha= "";
    this.gestor.confirmaSenha= "";
    this.gestor.email= "";
    this.gestor.datanascimento= null;
    this.gestor.sexo= 0;
    this.gestor.cpf= "";
    this.gestor.telefone= "";
    this.gestor.cidade= "";
    this.gestor.estado= "";
    this.gestor.bairro= "";
    this.gestor.cep= "";
    this.gestor.rua= "";
    this.gestor.numero= "";
    this.gestor.complemento= "";
    this.gestor.historico= "";
    this.gestor.cursos= "";
    this.gestor.comentario= "";
    this.gestor.termos= false;
  }

  voltar(){
    this.router.navigate(['/cadastro']);
  }

}