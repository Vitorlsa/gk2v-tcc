import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CadastroServiceService } from '../cadastro-service.service';
import { Prestador } from 'src/app/classes/prestador';
import { GLOBAL_PUBLISH_EXPANDO_KEY } from '@angular/core/src/render3/global_utils';

@Component({
  selector: 'app-cadastro-prestador',
  templateUrl: './cadastro-prestador.component.html',
  styleUrls: ['./cadastro-prestador.component.scss']
})
export class CadastroPrestadorComponent implements OnInit {

  constructor(private router: Router, private http: HttpClient, private cadastroService: CadastroServiceService) {
    this.prestador.sexo = 3;
    this.buscarCompetencias();
    this.buscarEstados();
  }


  public api = "http://localhost:8080/api/prestadordeservico/cadastrar";
  private apiEstados = "http://localhost:8080/api/dropdown/estados";
  private apiCidades = "http://localhost:8080/api/dropdown/cidadeporestado";
  public prestador = new Prestador();
  public imageSrc = "../../../../../assets/images/cadastro/usuarioPadrao.png";

  public cidades = null;
  public estados = null;
  public cpfJaCadastrado = false;
  public emailJaCadastrado = false;
  private apiverificarCpf = "http://localhost:8080/api/usuario/verificarcpfcadastrado";
  private apiverificarEmail = "http://localhost:8080/api/usuario/verificaremailcadastrado";
  private apiCompetencias = "http://localhost:8080/api/dropdown/competencias";
  private apiVerificaLogin = "http://localhost:8080/api/usuario/verificarlogincadastrado";
  public loginJaCadastrado = false;

  public competencias = [];
  public dropdownList = [];
  public selectedItems = [];
  public dropdownSettings = {
    singleSelection: false,
    idField: 'key',
    textField: 'value',
    selectAllText: 'Marcar todos',
    unSelectAllText: 'Demarcar todos',
    itemsShowLimit: 3,
    allowSearchFilter: true
  };

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
        button = t.find('.info');
      button.click(function (e) {
        t.toggleClass('show');
        e.preventDefault();
      });

    });
  }

  buscarCompetencias() {
    this.http.post(this.apiCompetencias, {}).subscribe(data => {
      console.log(data);
      this.competencias = Object.values(data);
    });
  }

  setCompetencias(event) {
    console.log(event.key);
    this.prestador.competencias.push(event.key);
  }

  removerCompetencia(event) {
    let index = this.prestador.competencias.indexOf(event.key);
    this.prestador.competencias.splice(index, 1);
  }


  setTodasCompetencias(event) {
    event.forEach(element => {
      this.prestador.competencias.push(element.key);
    });
  }


  previewImagem(event): void {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      this.imageSrc = reader.result.toString();
    }
    reader.readAsDataURL(file);
  }

  salvar() {
    try {
      if (this.emailJaCadastrado)
        throw "E-mail ja cadastrado";
      if (this.cpfJaCadastrado)
        throw "CPF ja cadastrado";
      if (this.loginJaCadastrado)
        throw "Login ja cadastrado";
      if (this.prestador.competencias.length < 1)
        throw "Selecione suas competencias";

      if (this.cadastroService.validaCadastro(this.prestador)) {
        this.prestador.imagem = this.imageSrc;
        this.http.post(this.api, this.prestador).subscribe(
          res => {
            alert("Cadastro salvo com sucesso");
            this.cadastroService.setContratantePaciente(this.prestador);
            this.limparUsuario();
            this.router.navigate(['/login']);
          },
          err => {
            console.log(err);
          });
      } else {
        alert("Campos preenchidos incorretamente");
      }
    }
    catch (e) {
      alert(e);
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

  async confereLogin() {
    let retorno = null;
    try {
      retorno = await this.http.post(this.apiVerificaLogin, { Login: this.prestador.login }).toPromise();
    } catch{
      console.log("nao chamaou api");
      retorno = false;
    }
    console.log("retorno --> " + retorno);
    this.loginJaCadastrado = retorno;
    return retorno;
  }

  setSexo(event) {
    this.prestador.setSexo(event.target.value);
  }

  setTermos(event) {
    this.prestador.setTermos(event.target.value);
  }

  cancelar() {
    this.router.navigate(['/login']);
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
    this.prestador.cidade = null;
    this.prestador.estado = "";
    this.prestador.bairro = "";
    this.prestador.cep = "";
    this.prestador.rua = "";
    this.prestador.numero = "";
    this.prestador.complemento = "";
    this.prestador.competencias = [];
    this.prestador.comentario = "";
    this.prestador.termos = false;
  }


  buscarEstados() {
    this.http.post(this.apiEstados, {}).subscribe(data => {
      console.log(data);
      this.estados = data;
      // this.estados.forEach((element, index) => {
      //   this.estados[index].item_id = element.key;
      //   this.estados[index].item_text = element.value;
      // });

    },
      err => {
        console.log(err);
      });
  }

  buscarCidades(uf) {
    this.http.post(this.apiCidades, { Uf: uf }).subscribe(data => {
      console.log(data);
      this.cidades = data;
      this.prestador.cidade = data[0].key;
    },
      err => {
        console.log(err);
      });
  }

  setEstado(event) {
    console.log(event.target.value);
    this.prestador.estado = event.target.value;
    this.buscarCidades(event.target.value);
  }

  setCidade(event) {
    console.log(event.target.value);
    this.prestador.cidade = event.target.value;
  }

  saveBase64(event): void {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {

      this.prestador.curriculo = reader.result.toString();

      console.log(this.prestador.curriculo);

    }
    reader.readAsDataURL(file);
  }


  voltar() {
    this.router.navigate(['/cadastro']);
  }
}