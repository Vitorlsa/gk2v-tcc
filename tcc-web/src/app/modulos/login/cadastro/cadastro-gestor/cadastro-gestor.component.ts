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
  constructor(private router: Router, private http: HttpClient, private cadastroService: CadastroServiceService) {
    this.gestor.sexo = 3;
    this.buscarEstados();
  }

  public api = "http://localhost:8080/api/gestor/cadastrar";
  public cidades = null;
  public estados = null;
  public cpfJaCadastrado = false;
  public emailJaCadastrado = false;
  private apiverificarCpf = "http://localhost:8080/api/usuario/verificarcpfcadastrado";
  private apiverificarEmail = "http://localhost:8080/api/usuario/verificaremailcadastrado";
  private apiEstados = "http://localhost:8080/api/dropdown/estados";
  private apiCidades = "http://localhost:8080/api/dropdown/cidadeporestado";

  public imageSrc = "../../../../../assets/images/cadastro/usuarioPadrao.png";
  public gestor = new Gestor();


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

    // if (this.gestor.curriculo.startsWith('data:application/pdf;base64')){



    try {
      if (this.emailJaCadastrado)
        throw "E-mail ja cadastrado";
      if (this.cpfJaCadastrado)
        throw "CPF ja cadastrado";
      if (this.gestor.curriculo == "")
        throw "Insira um curriculo em PDF";
      if (!this.gestor.curriculo.startsWith('data:application/pdf'))
        throw "Curriculo não é PDF";


      if (this.cadastroService.validaCadastro(this.gestor)) {
        this.gestor.imagem = this.imageSrc;
        this.http.post(this.api, this.gestor).subscribe(
          res => {
            alert("Cadastro salvo com sucesso");
            this.cadastroService.setContratantePaciente(this.gestor);
            this.limparUsuario();
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
      retorno = await this.http.post(this.apiverificarCpf, { Cpf: this.gestor.cpf }).toPromise();
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
      retorno = await this.http.post(this.apiverificarEmail, { Email: this.gestor.email }).toPromise();
    } catch{
      console.log("nao chamaou api");
      retorno = false;
    }
    console.log("retorno --> " + retorno);
    this.emailJaCadastrado = retorno;
    return retorno;
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
    this.gestor.nome = "";
    this.gestor.login = "";
    this.gestor.senha = "";
    this.gestor.confirmaSenha = "";
    this.gestor.email = "";
    this.gestor.datanascimento = null;
    this.gestor.sexo = 0;
    this.gestor.cpf = "";
    this.gestor.telefone = "";
    this.gestor.cidade = null;
    this.gestor.estado = "";
    this.gestor.bairro = "";
    this.gestor.cep = "";
    this.gestor.rua = "";
    this.gestor.numero = "";
    this.gestor.complemento = "";
    this.gestor.curriculo = "";
    this.gestor.comentario = "";
    this.gestor.termos = false;
  }

  saveBase64(event): void {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {

      this.gestor.curriculo = reader.result.toString();

      console.log(this.gestor.curriculo);

    }
    reader.readAsDataURL(file);
  }

  previewImagem(event): void {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      this.imageSrc = reader.result.toString();
    }
    reader.readAsDataURL(file);
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
      this.gestor.cidade = data[0].key;
    },
      err => {
        console.log(err);
      });
  }

  setEstado(event) {
    console.log(event.target.value);
    this.gestor.estado = event.target.value;
    this.buscarCidades(event.target.value);
  }

  setCidade(event) {
    console.log(event.target.value);
    this.gestor.cidade = event.target.value;
  }

  voltar() {
    this.router.navigate(['/cadastro']);
  }

}