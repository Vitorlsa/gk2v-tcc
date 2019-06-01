import { Component, OnInit } from '@angular/core';
import { UtilsService } from 'src/app/funcoes/utils.service';
import { CadastroServiceService } from '../login/cadastro/cadastro-service.service';
import { LoginService } from '../login/login.service';
import { HttpClient } from '@angular/common/http';
import { Medicamento } from 'src/app/classes/medicamento';
import { registerLocaleData } from '@angular/common';
import { DatePipe } from '@angular/common';
import localePt from '@angular/common/locales/pt';
registerLocaleData(localePt);
@Component({
  selector: 'app-medicamentos',
  templateUrl: './medicamentos.component.html',
  styleUrls: ['./medicamentos.component.scss']
})
export class MedicamentosComponent implements OnInit {

  constructor(private http: HttpClient, private service: LoginService, private cadastroService: CadastroServiceService, private util: UtilsService) { }

  private apicadastrar = "http://localhost:8080/api/medicamento/cadastrar";
  private apiEditar = "http://localhost:8080/api/medicamento/editar";
  private apiListar = "http://localhost:8080/api/medicamento/listar";
  private apiDetalhar = "http://localhost:8080/api/medicamento/detalhar";
  private apiRemover = "http://localhost:8080/api/medicamento/remover";
  private apiListarBeneficiario = "http://localhost:8080/api/beneficiario/listarporcontratante";
  private contratante = this.service.getUsuario();
  public medicamento = new Medicamento();
  public novoMedicamento = false;
  public medicamentosPaciente = null;
  public dataFormatada = null;
  public perfilMedicamento = null;
  public beneficiarioSelecionado = null;
  public todosPacientes = null;


  ngOnInit() {

    this.listarBeneficiario();
    //this.listarRemedios();

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
          this.todosPacientes[index].dataFormatada = new DatePipe('pt-BR').transform(element.dataNascimento, 'dd/MM/yyyy');
        });
      })
    } catch{
      console.log("nao chamaou api");
    }
  }

  selecionarBeneficiario(beneficiario) {
    this.beneficiarioSelecionado = beneficiario;
    this.listarRemedios(this.beneficiarioSelecionado);
  }

  listarRemedios(param) {
    try {
      this.http.post(this.apiListar, { Id: param.id }).subscribe(data => {
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
  }

  salvar() {
    console.log(this.medicamento);
    let payload = this.medicamento;
    payload.IdBeneficiario = this.beneficiarioSelecionado.id;
    payload.Tipo = 1;
    payload.ViaDeUso = 1;
    try {
      this.http.post(this.apicadastrar, payload).subscribe(data => {
        console.log(data);
        this.medicamentosPaciente.forEach((element, index) => {
          this.medicamentosPaciente[index].dataFormatada = new DatePipe('pt-BR').transform(element.dataValidade, 'dd/MM/yyyy');
        });
      })
    } catch{
      console.log("nao chamaou api");
    }
  }

  voltar() {
    this.novoMedicamento = false;
  }

}
