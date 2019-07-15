import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../login/login.service';
import { Usuario } from 'src/app/classes/usuario';
import { Gestor } from 'src/app/classes/gestor';
import { Prestador } from 'src/app/classes/prestador';
import { CadastroServiceService } from '../../login/cadastro/cadastro-service.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { UtilsService } from 'src/app/funcoes/utils.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss']
})
export class PerfilComponent implements OnInit {

  constructor(private http: HttpClient, private router: Router, private service: LoginService, private cadastroService: CadastroServiceService, private utils: UtilsService) {
    // this.buscarDados();
    this.buscarEstados();
  }

  public perfilLogado = null;
  public usuario = null;
  public apiContratante = "http://localhost:8080/api/contratante/editar";
  private apiDadosContratante = "http://localhost:8080/api/contratante/buscar";
  public apiPrestador = "http://localhost:8080/api/prestadordeservico/editar";
  private apiDadosPrestador = "http://localhost:8080/api/prestadordeservico/buscar";
  public apiGestor = "http://localhost:8080/api/gestor/editar";
  private apiDadosGestor = "http://localhost:8080/api/gestor/buscar";
  private apiEstados = "http://localhost:8080/api/dropdown/estados";
  private apiCidades = "http://localhost:8080/api/dropdown/cidadeporestado";
  private apiCompetencias = "http://localhost:8080/api/dropdown/competencias";
  public apiCadastro: string;
  private apiDados: string;
  public usuaLogado = this.service.getUsuario();
  public imageSrc = "../../../../../assets/images/cadastro/usuarioPadrao.png";

  public competencias = [];
  public cidades = null;
  public estados = null;

  dropdownList = [];
  selectedItems = [];
  dropdownSettings = {
    singleSelection: false,
    idField: 'key',
    textField: 'value',
    selectAllText: 'Select All',
    unSelectAllText: 'UnSelect All',
    itemsShowLimit: 3,
    allowSearchFilter: true
  };

  ngOnInit() {
    this.perfilLogado = this.service.getSessionPerfil()

    if (this.perfilLogado == 2) {
      this.usuario = new Usuario();
      this.usuario.setTermos(true);
      this.apiCadastro = this.apiContratante;
      this.apiDados = this.apiDadosContratante;
    } else if (this.perfilLogado == 3) {
      this.usuario = new Gestor();
      this.apiCadastro = this.apiGestor;
      this.apiDados = this.apiDadosGestor;
    } else if (this.perfilLogado == 4) {
      this.usuario = new Prestador();
      this.apiCadastro = this.apiPrestador;
      this.apiDados = this.apiDadosPrestador;
      this.buscarCompetencias();
    }
    this.buscarDados();


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

  setEstado(event) {
    console.log(event.target.value);
    this.usuario.estado = event.target.value;
    this.buscarCidades(event.target.value);
  }

  setCidade(event) {
    console.log(event.target.value);
    this.usuario.cidade = event.target.value;
  }

  // setTermos() {
  //   this.usuario.setTermos(true);
  // }


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


  salvar() {
    try {
      // if (this.emailJaCadastrado)
      //   throw "E-mail ja cadastrado";
      // if (this.cpfJaCadastrado)
      //   throw "CPF ja cadastrado";
      // if (this.loginJaCadastrado)
      //   throw "Login ja cadastrado";

      if (this.cadastroService.validaCadastro(this.usuario)) {
        this.usuario.imagem = this.imageSrc;
            this.http.post(this.apiCadastro, this.usuario).subscribe(
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
          } catch (e) {
            alert(e);
          }
}

  saveBase64(event): void {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      this.usuario.curriculo = reader.result.toString();

      console.log(this.usuario.curriculo);

    }
    reader.readAsDataURL(file);
  }


  buscarDados() {
    this.http.post(this.apiDados, { Id: this.usuaLogado.id }).subscribe(
      res => {
        this.usuario = res;
        this.usuario.dataNascimento = this.utils.modelToDate(this.usuario.dataNascimento);
        this.usuario.sexo = this.utils.converteSexoServer(this.usuario.sexo);
        console.log(this.usuario);
      },
      err => {
        console.log(err);
      });

  }

  setCompetencias(event) {
    console.log(event.key);
    this.usuario.competencias.push(event.key);
  }

  removerCompetencia(event) {
    console.log(event.key);
    this.usuario.competencias.pop(event.key);
  }


  setTodasCompetencias(event) {
    event.forEach(element => {
      this.usuario.competencias.push(element.key);
    });
  }

  buscarCompetencias() {
    this.http.post(this.apiCompetencias, {}).subscribe(data => {
      this.competencias = Object.values(data);
      console.log(this.competencias);
    });
  }

  cancelar() {
    this.router.navigate(['/board']);
  }

}

