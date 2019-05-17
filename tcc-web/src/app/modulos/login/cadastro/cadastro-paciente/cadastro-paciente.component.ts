import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CadastroServiceService } from '../cadastro-service.service';
import { Paciente } from 'src/app/classes/paciente';
import { LoginService } from '../../login.service';
import localePt from '@angular/common/locales/pt';
import { registerLocaleData } from '@angular/common';
import { DatePipe } from '@angular/common';
import { UtilsService } from 'src/app/funcoes/utils.service';
registerLocaleData(localePt);

@Component({
  selector: 'app-cadastro-paciente',
  templateUrl: './cadastro-paciente.component.html',
  styleUrls: ['./cadastro-paciente.component.scss']
})
export class CadastroPacienteComponent implements OnInit {


  constructor(private http: HttpClient, private service: LoginService, private cadastroService: CadastroServiceService, private util:UtilsService) {
    this.paciente.sexo = 3;
  }

  private apiSalvar = "http://localhost:8080/api/beneficiario/adicionar";
  private apiListar = "http://localhost:8080/api/beneficiario/listarporcontratante";
  private contratante = this.service.getUsuario();
  public paciente = new Paciente();
  public novoPaciente = false;
  public todosPacientes = null;
  public dataFormatada = null;
  public perfilPaciente = null
  //public pacienteSelecionado = null;


  @Output()
  emitir = new EventEmitter<any>();
  pacienteSelecionado = null;

  ngOnInit() {
    this.limparPaciente();

    this.listarPacientes();

    this.perfilPaciente = this.service.getSessionPerfil();

    var $window = $(window),
      $header = $('#header'),
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


  listarPacientes() {
    try {
      this.http.post(this.apiListar, { Id: this.contratante.id }).subscribe(data => {
        console.log(data);
        this.todosPacientes = [];
        console.log(typeof data);
        this.todosPacientes = data;
        this.todosPacientes.forEach((element, index) => {
          this.todosPacientes[index].dataFormatada = new DatePipe('pt-BR').transform(element.dataNascimento, 'dd/MM/yyyy');
        });

      })
    } catch{
      console.log("nao chamaou api");
    }
  }

  editarPaciente(param) {
    console.log(param);
    this.pacienteSelecionado = param;
    console.log(!this.util.nullOrUndef(this.pacienteSelecionado));
    this.emitir.emit(this.pacienteSelecionado);
    $('.modal-open').prop('checked', true);
  }




  criarNovoPaciente() {
    this.novoPaciente = true;
  }

  voltar() {
    this.limparPaciente();
    this.novoPaciente = false;
  }

  setSexo(event) {
    this.paciente.setSexo(event.target.value);
  }

  setTermos(event) {
    this.paciente.setTermos(event.target.value);
  }

  salvar() {
    console.log(this.paciente);
    this.paciente.IdContratante = this.contratante.id
    if (this.cadastroService.validaCadastro(this.paciente)) {
      this.http.post(this.apiSalvar, this.paciente).subscribe(
        res => {
          alert("Cadastro salvo com sucesso");
          this.cadastroService.setContratantePaciente(this.paciente);
        },
        err => {
          console.log(err);
        });
    } else {
      alert("Campos preenchidos incorretamente");
    }
  }

  limparPaciente() {
    this.paciente.nome = "";
    // this.paciente.login= "";
    // this.paciente.senha= "";
    // this.paciente.confirmaSenha= "";
    this.paciente.email = "";
    this.paciente.datanascimento = null;
    this.paciente.sexo = 0;
    // this.paciente.cpf = "";
    this.paciente.telefone = "";
    this.paciente.cidade = "";
    this.paciente.estado = "";
    this.paciente.bairro = "";
    this.paciente.cep = "";
    this.paciente.rua = "";
    this.paciente.numero = "";
    this.paciente.complemento = "";
    this.paciente.comentario = "";
    //this.paciente.termos= false;
    this.paciente.condicoesClinicas = "";

  }
}
