import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { UtilsService } from 'src/app/funcoes/utils.service';
import { CadastroServiceService } from '../login/cadastro/cadastro-service.service';
import { LoginService } from '../login/login.service';
import { HttpClient } from '@angular/common/http';
import { Medicamento } from 'src/app/classes/medicamento';
import { registerLocaleData } from '@angular/common';
import { DatePipe } from '@angular/common';
import localePt from '@angular/common/locales/pt';
import { Router } from '@angular/router';
registerLocaleData(localePt);
@Component({
  selector: 'app-medicamentos',
  templateUrl: './medicamentos.component.html',
  styleUrls: ['./medicamentos.component.scss']
})
export class MedicamentosComponent implements OnInit {


  constructor(private http: HttpClient, private service: LoginService, private cadastroService: CadastroServiceService, private util: UtilsService, private route: Router) { }

  private apicadastrar = "http://localhost:8080/api/medicamento/cadastrar";
  private apiListar = "http://localhost:8080/api/beneficiario/listarmedicamento";
  private apiRemoverAdm = "http://localhost:8080/api/medicamento/remover";
  private apiListarAdm = "http://localhost:8080/api/medicamento/listar";
  private apiRemoverMedBenef = "http://localhost:8080/api/beneficiario/removermedicamento"; // precisa ver esse no server
  //private apiDetalharMedBenef = "http://localhost:8080/api/beneficiario/detalhesmedicamento";
  //private apiEditarMedBenef = "http://localhost:8080/api/beneficiario/editarmedicamento";

  private apiListarBeneficiario = "http://localhost:8080/api/beneficiario/listarporcontratante";
  private apiDropTipoMedicamento = "http://localhost:8080/api/dropdown/tipomedicamento";
  private apiDropMedicamentos = "http://localhost:8080/api/dropdown/medicamentos";
  private apiDropViaDeUso = "http://localhost:8080/api/dropdown/viadeusomedicamento";
  public apiSalvarMedicamentoBeneficiario = "http://localhost:8080/api/beneficiario/adicionarmedicamento";
  public apiBuscarPosologia = "http://localhost:8080/api/dropdown/posologia"
  private contratante = this.service.getUsuario();
  public medicamento = new Medicamento();
  public novoMedicamento = false;
  public medicamentosPaciente = null;
  public dataFormatada = null;
  public perfilMedicamento = null;
  public beneficiarioSelecionado = null;
  public todosPacientes = null;
  public perfilLogado = this.service.getSessionPerfil()[0];
  public todosMedicamentos = [];
  public selectedItems = [];
  public tipoMedicamentos: any[];
  public viaDeUsoMedicamentos: any[];
  public todasPosologias = [];

  public dropdownSettings = {
    singleSelection: false,
    idField: 'key',
    textField: 'value',
    selectAllText: 'Select All',
    unSelectAllText: 'UnSelect All',
    itemsShowLimit: 3,
    allowSearchFilter: true
  };

  public pesquisa: string;

  ngOnInit() {


    console.log(this.contratante);
    if (this.perfilLogado != 1) {
      this.listarBeneficiario();

    } else {
      this.listarMedicamentosAdm();
    }

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


  listarBeneficiario() {
    try {
      this.http.post(this.apiListarBeneficiario, { Id: this.contratante.id }).subscribe(data => {
        this.todosPacientes = [];
        this.todosPacientes = data;
        this.todosPacientes.forEach((element, index) => {
          if (this.todosPacientes[index].sexo == 1)
            this.todosPacientes[index].sexo = 'masculino'
          else if (this.todosPacientes[index].sexo == 2)
            this.todosPacientes[index].sexo = 'feminino'
          else
            this.todosPacientes[index].sexo = 'outro'

          this.todosPacientes[index].dataFormatada = new DatePipe('pt-BR').transform(element.dataNascimento, 'dd/MM/yyyy');
        });
      })
    } catch{
      console.log("nao chamaou api");
    }
  }

  selecionarBeneficiario(beneficiario) {
    this.beneficiarioSelecionado = beneficiario;
    this.listarRemedios();
  }

  listarRemedios() {
    try {
      this.http.post(this.apiListar, { Id: this.beneficiarioSelecionado.id }).subscribe(data => {
        this.medicamentosPaciente = [];
        this.medicamentosPaciente = data;
        console.log(this.medicamentosPaciente);
      })
    } catch{
      console.log("nao chamaou api");
    }
  }


  /*ADM */
  listarMedicamentosAdm() {
    try {
      this.http.post(this.apiListarAdm, {}).subscribe(data => {
        this.medicamentosPaciente = [];
        this.medicamentosPaciente = data;
        console.log(this.medicamentosPaciente);
      })
    } catch{
      console.log("nao chamaou api");
    }
  }

  excluirMedicamentoAdm(param) {
    try {
      this.http.post(this.apiRemoverAdm, { Id: param.id }).subscribe(data => {
        this.listarMedicamentosAdm();
      })
    } catch{
      console.log("nao chamaou api");
    }
  }
  /*Fim ADM */


  criarNovoRemedio() {
    this.novoMedicamento = true;
    this.buscarMedicamentos();
    this.buscarViaDeUso();
    this.buscarTipoMedicamentos();
    this.buscarPosologia();
  }

  salvar() {
    console.log(this.medicamento);
    let payload = this.medicamento;
    //payload.IdBeneficiario = this.beneficiarioSelecionado.id;
    payload.tipo = 1;
    payload.viaDeUso = 1;
    try {
      this.http.post(this.apicadastrar, payload).subscribe(data => {
        console.log(data);
        alert("Medicamento cadastrado");
        this.novoMedicamento = false;
        this.listarMedicamentosAdm();
        // this.medicamentosPaciente.forEach((element, index) => {
        //   this.medicamentosPaciente[index].dataFormatada = new DatePipe('pt-BR').transform(element.dataValidade, 'dd/MM/yyyy');
        // });
      })
    } catch{
      console.log("nao chamaou api");
    }
  }

  voltar() {
    if (this.novoMedicamento) {
      this.novoMedicamento = false;
    }
    else if (this.beneficiarioSelecionado != null) {
      this.beneficiarioSelecionado = null;
    }
    else {
      this.route.navigate(["/board"]);
    }
  }


  buscarMedicamentos() {
    this.http.post(this.apiDropMedicamentos, {}).subscribe(data => {
      console.log(data);
      this.todosMedicamentos = Object.values(data);
    });
  }

  buscarViaDeUso() {
    this.http.post(this.apiDropViaDeUso, {}).subscribe(data => {
      console.log(data);
      this.viaDeUsoMedicamentos = Object.values(data);
    });
  }

  buscarTipoMedicamentos() {
    this.http.post(this.apiDropTipoMedicamento, {}).subscribe(data => {
      console.log(data);
      this.tipoMedicamentos = Object.values(data);
    });
  }

  setMedicamentoPosologia(event) {

    this.beneficiarioSelecionado.posologia = event.target.value;
  }

  setMedicamentoBeneficiario(event) {

    this.beneficiarioSelecionado.medicamento = event.target.value;
  }

  //api/dropdown/posologia
  buscarPosologia() {
    this.http.post(this.apiBuscarPosologia, {}).subscribe(data => {
      this.todasPosologias = Object.values(data);
    });
  }

  setTipoMedicamento(event) {
    this.medicamento.tipo = event.target.value;
  }

  setViaDeUso(event) {
    this.medicamento.viaDeUso = event.target.value;
  }


  @Output()
  emitir = new EventEmitter<any>();
  medicamentoSelecionado = null;

  editarMedicamentoAdm(param) {
    this.medicamentoSelecionado = param;
    this.emitir.emit(this.medicamentoSelecionado);
  }

  // BENEFICIARIO
  escluirMedicamentoBeneficiario(param) {
    try {
      this.http.post(this.apiRemoverMedBenef, { Id: param.id }).subscribe(data => {
        alert("medicamento excluido");
        this.listarRemedios();
      })
    } catch{
      console.log("nao chamaou api");
    }
  }


  // detalharMedicamentoBeneficiario(param) {
  //   try {
  //     this.http.post(this.apiDetalharMedBenef, { Id: param.id }).subscribe(data => {
  //       //implementar
  //     })
  //   } catch{
  //     console.log("nao chamaou api");
  //   }
  // }


  // editarMedicamentoBeneficiario(param) {
  //   try {
  //     this.http.post(this.apiEditarMedBenef, { Id: param.id }).subscribe(data => {
  //       // implementar
  //     })
  //   } catch{
  //     console.log("nao chamaou api");
  //   }
  // }

  salvarMedicamentoBeneficiario() {
    var payload = {
      BeneficiarioId: this.beneficiarioSelecionado.id,
      MedicamentoId: this.beneficiarioSelecionado.medicamento,
      PosologiaId: this.beneficiarioSelecionado.posologia,
      Quantidade: this.beneficiarioSelecionado.qtdMedicamento
    };

    try {
      if (this.util.nullOrUndef(payload.BeneficiarioId) || this.util.nullOrUndef(payload.MedicamentoId) || this.util.nullOrUndef(payload.PosologiaId) || this.util.nullOrUndef(payload.Quantidade))
        throw "É necessário preencher nome, posologia e quantidade";

      this.http.post(this.apiSalvarMedicamentoBeneficiario, payload).subscribe(data => {
        console.log(data);
        alert("Medicamento salvo!");
        this.listarRemedios();
      });
    } catch (e) {
      alert(e || "É necessário preencher nome, posologia e quantidade");
    }
  }
  // FIM BENEFICIARIO 

}
