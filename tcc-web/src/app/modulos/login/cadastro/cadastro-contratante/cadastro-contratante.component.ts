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
  public imageSrc = "../../../../../assets/images/cadastro/usuarioPadrao.png";

  public api = "http://localhost:8080/api/contratante/cadastrar";
  public termos = [{
    valor: true,
    name: 'Aceito'
  }, {
    valor: false,
    name: "Não aceito",
  }];


  public cidades = null;
  public estados = null;
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


  // validateEmail(email) {
  //   var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  //   console.log(re.test(String(email).toLowerCase()));
  //   return re.test(String(email).toLowerCase());
  // }

  // toDate(dateStr) {
  //   const [year, month, day] = dateStr.split("-");
  //   return new Date(year, month - 1, day)
  // }

  // calculateAge(birthday) { // birthday is a date
  //   var ageDifMs = Date.now() - birthday.getTime();
  //   var ageDate = new Date(ageDifMs); // miliseconds from epoch
  //   return Math.abs(ageDate.getUTCFullYear() - 1970);
  // }


  salvar() {
    // let idade = this.cadastroService.toDate(this.usuario.datanascimento);
    // console.log(this.cadastroService.calculateAge(idade));
    // if (this.cadastroService.calculateAge(idade) >= 18) {

    //     if (this.usuario.confirmaSenha.length >= 6 && this.usuario.senha.length >= 6) {
    //       if (this.cadastroService.validateEmail(this.usuario.email)) {
    //         if (this.cadastroService.testaCPF(this.usuario.cpf)) {
    try {
      if (this.emailJaCadastrado)
        throw "E-mail ja cadastrado";

      if (this.cpfJaCadastrado)
        throw "CPF ja cadastrado";


      if (this.cadastroService.validaCadastro(this.usuario)) {
        this.usuario.imagem = this.imageSrc;
        this.http.post(this.api, this.usuario).subscribe(
          res => {
            alert("Cadastro salvo com sucesso");
            this.cadastroService.setContratantePaciente(this.usuario);
            this.limparUsuario();
            this.router.navigate(['/login']);
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
    //         } else {
    //           alert("cpf invalido");
    //         }
    //       }else{
    //         alert("email invalido");
    //       }
    //     }else{
    //       alert("senha deve ter ao menos 6 caracteres");
    //     }
    //   }
    // } else {
    //   alert("Precisa ser maior de 18 anos para se cadastrar.");
    // }
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
    this.usuario.cidade = null;
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