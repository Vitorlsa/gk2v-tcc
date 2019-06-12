import { Component, OnInit } from '@angular/core';
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
  private apiEditar = "http://localhost:8080/api/medicamento/editar";
  private apiListar = "http://localhost:8080/api/medicamento/listar";
  private apiDetalhar = "http://localhost:8080/api/medicamento/detalhar";
  private apiRemover = "http://localhost:8080/api/medicamento/remover";
  private apiListarBeneficiario = "http://localhost:8080/api/beneficiario/listarporcontratante";
  private apiDropTipoMedicamento = "http://localhost:8080/api/dropdown/medicamentos";
  private apiDropMedicamentos = "http://localhost:8080/api/dropdown/viadeusomedicamento";
  private apiDropViaDeUso = "http://localhost:8080/api/dropdown/tipomedicamento";
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


  ngOnInit() {


    console.log(this.contratante);
    if (this.perfilLogado != 1) {
      this.listarBeneficiario();

    } else {
      this.listarRemedios();
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
    //this.listarRemedios(this.beneficiarioSelecionado);
  }

  listarRemedios() {
    try {
      this.http.post(this.apiListar, {}).subscribe(data => {
        this.medicamentosPaciente = [];
        this.medicamentosPaciente = data;
        this.medicamentosPaciente.forEach((element, index) => {
          this.medicamentosPaciente[index].dataFormatada = new DatePipe('pt-BR').transform(element.dataValidade, 'dd/MM/yyyy');
        });
      })
    } catch{
      console.log("nao chamaou api");
    }
  }



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
    payload.Tipo = 1;
    payload.ViaDeUso = 1;
    try {
      this.http.post(this.apicadastrar, payload).subscribe(data => {
        console.log(data);
        alert("Medicamento cadastrado");
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


  salvarMedicamentoBeneficiario() {
    var payload = {
      BeneficiarioId: this.beneficiarioSelecionado.id,
      MedicamentoId: this.beneficiarioSelecionado.medicamento,
      PosologiaId:this.beneficiarioSelecionado.posologia,
      Quantidade:this.beneficiarioSelecionado.qtdMedicamento
    };


    this.http.post(this.apiSalvarMedicamentoBeneficiario, payload).subscribe(data => {
      console.log(data);
      this.tipoMedicamentos = Object.values(data);
    });
  }

  setTipoMedicamento(event) {
    this.medicamento.Tipo = event.target.value;
  }

  setViaDeUso(event) {
    this.medicamento.ViaDeUso = event.target.value;
  }

}
