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
  public imageSrc: string;
  public api = "http://localhost:8080/api/contratante/cadastrar";
  public termos = [{
    valor: true,
    name: 'Aceito'
  }, {
    valor: false,
    name: "Não aceito",
  }];

  // public estados = [{
  //   item_id: 1,
  //   item_text: 'Acre'
  // }, {
  //   item_id: 2,
  //   item_text: "São Paulo",
  // }];
  public cidades = null;

  public estados = null;
  public estados2 = null;
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

  setEstado(event) {
    console.log(event.target.value);
    this.usuario.estado = event.target.value;
    this.buscarCidades(event.target.value);
  }

  setCidade(event) {
    console.log(event.target.value);
    this.usuario.cidade = event.target.value;

  }

  public cpfJaCadastrado = false;
  public emailJaCadastrado = false;
  private apiverificarCpf = "http://localhost:8080/api/usuario/verificarcpfcadastrado";
  private apiverificarEmail = "http://localhost:8080/api/usuario/verificaremailcadastrado";
  private apiEstados = "http://localhost:8080/api/dropdown/estados";
  private apiCidades = "http://localhost:8080/api/dropdown/cidadeporestado";

  constructor(private router: Router, private http: HttpClient, private cadastroService: CadastroServiceService) {
    this.usuario.sexo = 3;
    this.buscarEstados();
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

  previewImagem(event): void {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      this.imageSrc = reader.result.toString();
    }
    reader.readAsDataURL(file);
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
        this.usuario.imagem = this.imageSrc;
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

  confereSenha() {

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
    },
      err => {
        console.log(err);
      });
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