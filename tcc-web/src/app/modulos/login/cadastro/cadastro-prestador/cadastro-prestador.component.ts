import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CadastroServiceService } from '../cadastro-service.service';
import { Prestador } from 'src/app/classes/prestador';

@Component({
  selector: 'app-cadastro-prestador',
  templateUrl: './cadastro-prestador.component.html',
  styleUrls: ['./cadastro-prestador.component.scss']
})
export class CadastroPrestadorComponent implements OnInit {

  constructor(private router: Router, private http: HttpClient, private cadastroService: CadastroServiceService) {
    this.prestador.sexo = 3;
  }


  public api = "http://localhost:8080/api/prestadordeservico/cadastrar";

  public prestador = new Prestador();


  public cpfJaCadastrado = false;
  public emailJaCadastrado = false;
  private apiverificarCpf = "http://localhost:8080/api/usuario/verificarcpfcadastrado";
  private apiverificarEmail = "http://localhost:8080/api/usuario/verificaremailcadastrado";

  ngOnInit() {
    this.limparUsuario();


    var $header = $('#header'),
    $footer = $('#footer');

  // Header.
  $header.each(function () {
    var t = jQuery(this),
      button = t.find('.button');
    button.click(function (e) {
      t.toggleClass('hide');
      if (t.hasClass('preview')) {
        return true;
      } else {
        e.preventDefault();
      }
    });
  });

  $footer.each(function () {
    var t = jQuery(this),
      inner = t.find('.inner'),
      button = t.find('.info');
    button.click(function (e) {
      t.toggleClass('show');
      e.preventDefault();
    });

  });
  }

  salvar() {
    if (!this.emailJaCadastrado && !this.cpfJaCadastrado) {
      if (this.cadastroService.validaCadastro(this.prestador)) {
        this.http.post(this.api, this.prestador).subscribe(data => {
          // console.log(data);
          alert("Cadastro salvo com sucesso");
        })
      } else {
        alert("Campos preenchidos incorretamente");
      }
    }
  }


  async confereCpf() {
    let retorno = null;
    try {
      retorno = await this.http.post(this.apiverificarCpf, { Cpf: this.prestador.cpf }).toPromise();
    } catch{
      console.log("nao chamaou api");
      retorno = false;
    }
    console.log("retorno --> " + retorno);
    this.cpfJaCadastrado = retorno;
    return retorno;
  }


  async confereEmail() {
    let retorno = null;
    try {
      retorno = await this.http.post(this.apiverificarEmail, { Email: this.prestador.email }).toPromise();
    } catch{
      console.log("nao chamaou api");
      retorno = false;
    }
    console.log("retorno --> " + retorno);
    this.emailJaCadastrado = retorno;
    return retorno;
  }

  setSexo(event) {
    this.prestador.setSexo(event.target.value);
  }

  setTermos(event) {
    this.prestador.setTermos(event.target.value);
  }

  cancelar() {
    this.router.navigate(['/cadastro']);
  }


  limparUsuario() {
    // this.prestador = new Prestador();
    this.prestador.nome = "";
    this.prestador.login = "";
    this.prestador.senha = "";
    this.prestador.confirmaSenha = "";
    this.prestador.email = "";
    this.prestador.datanascimento = null;
    this.prestador.sexo = 0;
    this.prestador.cpf = "";
    this.prestador.telefone = "";
    this.prestador.cidade = "";
    this.prestador.estado = "";
    this.prestador.bairro = "";
    this.prestador.cep = "";
    this.prestador.rua = "";
    this.prestador.numero = "";
    this.prestador.complemento = "";
    this.prestador.competencias = "";
    this.prestador.comentario = "";
    this.prestador.termos = false;
  }

  voltar() {
    this.router.navigate(['/cadastro']);
  }


}