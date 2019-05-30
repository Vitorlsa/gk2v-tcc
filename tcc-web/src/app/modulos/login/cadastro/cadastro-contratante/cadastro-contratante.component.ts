import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CadastroServiceService } from '../cadastro-service.service';
import { Usuario } from 'src/app/classes/usuario';

@Component({
  selector: 'app-cadastro-contratante',
  templateUrl: './cadastro-contratante.component.html',
  styleUrls: ['./cadastro-contratante.component.scss']
})
export class CadastroContratanteComponent implements OnInit {
  public usuario = new Usuario();

  public api = "http://localhost:8080/api/contratante/cadastrar";
  public termos = [{
    valor: true,
    name: 'Aceito'
  }, {
    valor: false,
    name: "Não aceito",
  }];

  public estados = [{
    id: 1,
    name: 'Acre'
  }, {
    id: 2,
    name: "São Paulo",
  }];

  dropdownList = [];
  selectedItems = [];
  dropdownSettings = {
    singleSelection: false,
    idField: 'item_id',
    textField: 'item_text',
    selectAllText: 'Select All',
    unSelectAllText: 'UnSelect All',
    itemsShowLimit: 3,
    allowSearchFilter: true
  };

  setEstado(event){
    console.log(event.target.value);
  }

  public cpfJaCadastrado = false;
  public emailJaCadastrado = false;
  private apiverificarCpf = "http://localhost:8080/api/usuario/verificarcpfcadastrado";
  private apiverificarEmail = "http://localhost:8080/api/usuario/verificaremailcadastrado";
  

  constructor(private router: Router, private http: HttpClient, private cadastroService: CadastroServiceService) {
    this.usuario.sexo = 3;
  }

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


  setSexo(event) {
    this.usuario.setSexo(event.target.value);
  }

  setTermos(event) {
    this.usuario.setTermos(event.target.value);
  }

  salvar() {
    if (!this.emailJaCadastrado && !this.cpfJaCadastrado) {
      if (this.cadastroService.validaCadastro(this.usuario)) {
        this.http.post(this.api, this.usuario).subscribe(
          res => {
            alert("Cadastro salvo com sucesso");
            this.cadastroService.setContratantePaciente(this.usuario);
          },
          err => {
            console.log(err);
          });
      } else {
        alert("Campos preenchidos incorretamente");
      }
    }
  }

  async confereCpf() {
    let retorno = null;
    try {
      retorno = await this.http.post(this.apiverificarCpf, { Cpf: this.usuario.cpf }).toPromise();
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
      retorno = await this.http.post(this.apiverificarEmail, { Email: this.usuario.email }).toPromise();
    } catch{
      console.log("nao chamaou api");
      retorno = false;
    }
    console.log("retorno --> " + retorno);
    this.emailJaCadastrado = retorno;
    return retorno;
  }


  cancelar() {
    this.router.navigate(['/cadastro']);
  }


  limparUsuario() {
    this.usuario.nome = "";
    this.usuario.login = "";
    this.usuario.senha = "";
    this.usuario.confirmaSenha = "";
    this.usuario.email = "";
    this.usuario.datanascimento = null;
    this.usuario.sexo = 3;
    this.usuario.cpf = "";
    this.usuario.telefone = "";
    this.usuario.cidade = "";
    this.usuario.estado = "";
    this.usuario.bairro = "";
    this.usuario.cep = "";
    this.usuario.rua = "";
    this.usuario.numero = "";
    this.usuario.complemento = "";
    this.usuario.comentario = "";
    this.usuario.termos = false;
  }

  voltar() {
    this.router.navigate(['/cadastro']);
  }

}