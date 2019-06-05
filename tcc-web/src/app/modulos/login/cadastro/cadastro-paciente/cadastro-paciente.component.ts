import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CadastroServiceService } from '../cadastro-service.service';
import { Paciente } from 'src/app/classes/paciente';
import { LoginService } from '../../login.service';
import localePt from '@angular/common/locales/pt';
import { registerLocaleData } from '@angular/common';
import { UtilsService } from 'src/app/funcoes/utils.service';
registerLocaleData(localePt);

@Component({
  selector: 'app-cadastro-paciente',
  templateUrl: './cadastro-paciente.component.html',
  styleUrls: ['./cadastro-paciente.component.scss']
})
export class CadastroPacienteComponent implements OnInit {


  constructor(private http: HttpClient, private service: LoginService, private cadastroService: CadastroServiceService, private util: UtilsService) {
    this.paciente.sexo = 3;
    this.buscarEstados();
    this.buscarCondicoesClinicas();
  }

  private apiSalvar = "http://localhost:8080/api/beneficiario/adicionar";
  private apiListar = "http://localhost:8080/api/beneficiario/listarporcontratante";
  private apiEstados = "http://localhost:8080/api/dropdown/estados";
  private apiCidades = "http://localhost:8080/api/dropdown/cidadeporestado";
  private apiCondicoes = "http://localhost:8080/api/dropdown/condicoesclinicas";
  private contratante = this.service.getUsuario();
  public paciente = new Paciente();
  public novoPaciente = false;
  public todosPacientes = null;
  public dataFormatada = null;
  public perfilPaciente = null
  
  public cidades = null;
  public estados = null;

  public condicoesClinicas = [];
  public dropdownList = [];
  public selectedItems = [];
  public dropdownSettings = {
    singleSelection: false,
    idField: 'key',
    textField: 'value',
    selectAllText: 'Select All',
    unSelectAllText: 'UnSelect All',
    itemsShowLimit: 3,
    allowSearchFilter: true
  };

  buscarCondicoesClinicas() {
    this.http.post(this.apiCondicoes, {}).subscribe(data => {
      console.log(data);
        this.condicoesClinicas = Object.values(data);
      });
  }

  setCondicoesClinicas(event) {
    console.log(event.key);
    this.paciente.condicoesClinicas.push(event.key);
  }

  removerCondicoesClinicas(event) {
    console.log(event.key);
    this.paciente.condicoesClinicas.pop();
  }


  setTodasCondicoesClinicas(event) {
    event.forEach(element => {
      this.paciente.condicoesClinicas.push(element.key);
    });
  }

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


    //this.cadastroService.setfecharModalEditarCallback(this.fecharModalEditar);
  }


  listarPacientes() {
    try {
      this.http.post(this.apiListar, { Id: this.contratante.id }).subscribe(data => {
        this.todosPacientes = [];
        this.todosPacientes = data;
        this.todosPacientes.forEach((element, index) => {
          if (this.todosPacientes[index].sexo == 1)
            this.todosPacientes[index].sexo = 'masculino'
          else if (this.todosPacientes[index].sexo == 2)
            this.todosPacientes[index].sexo = 'feminino'
          else
            this.todosPacientes[index].sexo = 'outro'
          //this.todosPacientes[index].dataFormatada = new DatePipe('pt-BR').transform(element.dataNascimento, 'dd/MM/yyyy');
          this.todosPacientes[index].idade = this.cadastroService.toDate(element.dataNascimento);
          this.todosPacientes[index].idade = this.cadastroService.calculateAge(element.idade);
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

  // fecharModalEditar() {
  //   this.listarPacientes();
  // }

  criarNovoPaciente() {
    this.novoPaciente = true;
    this.buscarEstados();
  }

  voltar() {
    this.limparPaciente();
    this.novoPaciente = false;
    this.listarPacientes();
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
          this.voltar();
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
    // this.paciente.email = "";
    this.paciente.datanascimento = null;
    this.paciente.sexo = 0;
    // this.paciente.cpf = "";
    this.paciente.telefone = "";
    this.paciente.cidade = null;
    this.paciente.estado = "";
    this.paciente.bairro = "";
    this.paciente.cep = "";
    this.paciente.rua = "";
    this.paciente.numero = "";
    this.paciente.complemento = "";
    this.paciente.comentario = "";
    this.paciente.termoDeResponsalidade= false;
    this.paciente.condicoesClinicas = [];

  }

  setEstado(event) {
    console.log(event.target.value);
    this.paciente.estado = event.target.value;
    this.buscarCidades(event.target.value);
  }

  setCidade(event) {
    console.log(event.target.value);
    this.paciente.cidade = event.target.value;
  }

  buscarEstados() {
    this.http.post(this.apiEstados, {}).subscribe(data => {
      console.log(data);
      this.estados = data;
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

}
