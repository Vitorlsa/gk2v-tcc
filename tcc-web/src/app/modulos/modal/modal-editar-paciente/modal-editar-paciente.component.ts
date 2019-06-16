import { Component, OnInit, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import localePt from '@angular/common/locales/pt';
import { registerLocaleData } from '@angular/common';
import { DatePipe } from '@angular/common';
import { CadastroServiceService } from '../../login/cadastro/cadastro-service.service';
import { UtilsService } from 'src/app/funcoes/utils.service';
import { Paciente } from 'src/app/classes/paciente';
registerLocaleData(localePt);

@Component({
  selector: 'app-modal-editar-paciente',
  templateUrl: './modal-editar-paciente.component.html',
  styleUrls: ['./modal-editar-paciente.component.scss']
})
export class ModalEditarPacienteComponent implements OnInit {

  constructor(private http: HttpClient, private cadastroService: CadastroServiceService, private utils: UtilsService) { }

  private apiBuscar = "http://localhost:8080/api/beneficiario/buscarporid";
  private apiSalvar = "http://localhost:8080/api/beneficiario/editar";
  private apiEstados = "http://localhost:8080/api/dropdown/estados";
  private apiCidades = "http://localhost:8080/api/dropdown/cidadeporestado";
  private apiCondicoes = "http://localhost:8080/api/dropdown/condicoesclinicas";

  public pacienteCompleto = new Paciente();
  public dataFormatada = "";
  public cidades = null;
  public estados = null;
  public estadoSelecionado = null;
  public cidadeSelecionada = null;
  public SexoSelecionado = "";
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
    defaultOpen: true,
    allowSearchFilter: true
  };


  @Input()
  pacienteSelecionado

  ngOnInit() {
    this.buscarEstados();
    this.pegarInfosBeneficiario(this.pacienteSelecionado);

    $('.modal-open').prop('checked', true);
  }

  pegarInfosBeneficiario(param) {
    try {
      this.http.post(this.apiBuscar, { Id: param.id }).subscribe(data => {
        console.log(data);
        this.pacienteCompleto = <Paciente>data;

        this.dataFormatada = new DatePipe('pt-BR').transform(this.pacienteCompleto.dataNascimento, 'dd/MM/yyyy');
        console.log(this.dataFormatada);
        if (this.pacienteCompleto.sexo == 1)
          this.SexoSelecionado = "masculino";
        else if (this.pacienteCompleto.sexo == 2)
          this.SexoSelecionado = "feminino";
        else
          this.SexoSelecionado = "outro";


        this.buscarCondicoesClinicas();
        this.estados.forEach((element) => {
          if (element.key == this.pacienteCompleto.estado) {
            element.selected = true;
          }
        });

        this.buscarCidades(this.pacienteCompleto.estado);


      })
    } catch{
      console.log("nao chamaou api");
    }
  }

  atualizarBeneficiario(param) {

    console.log(param);
    try {
      if (this.utils.nullOrUndefOrEmpty(param.nome))
        throw "Preencha o nome";
      if (this.utils.nullOrUndefOrEmpty(param.telefone))
        throw "Preencha o telefone";
      if (this.utils.nullOrUndefOrEmpty(param.bairro))
        throw "Preencha o bairro";
      if (this.utils.nullOrUndefOrEmpty(param.rua))
        throw "Preencha o rua";
      if (this.utils.nullOrUndefOrEmpty(param.numero))
        throw "Preencha o numero";
      if (this.utils.nullOrUndefOrEmpty(param.estado) || param.estado == 0)
        throw "Preencha o estado";
      if (this.utils.nullOrUndefOrEmpty(param.cidade) || param.cidade == 0)
        throw "Preencha a cidade";

      this.http.post(this.apiSalvar, param).subscribe(
        res => {
          alert("Cadastro salvo com sucesso");
          this.fechar();
        },
        err => {
          console.log(err);
        });
    } catch (e) {
      alert(e);
    }
  }


  buscarCondicoesClinicas() {
    this.http.post(this.apiCondicoes, {}).subscribe(data => {
      this.condicoesClinicas = Object.values(data);

      let condicoes = [];

      this.condicoesClinicas.forEach((condicao) => {
        this.pacienteCompleto.condicoesClinicas.forEach((item) => {
          if (item == condicao.key) {
            condicoes.push(condicao);
          }
        });
      });
      this.selectedItems = condicoes;
    });
  }

  setCondicoesClinicas(event) {
    console.log(event.key);
    this.pacienteCompleto.condicoesClinicas.push(event.key);
  }

  removerCondicoesClinicas(event) {
    console.log(event.key);
    this.pacienteCompleto.condicoesClinicas.pop();
  }


  setTodasCondicoesClinicas(event) {
    event.forEach(element => {
      this.pacienteCompleto.condicoesClinicas.push(element.key);
    });
  }

  fechar() {
    // this.cadastroService.fecharModalEditarCallback();
    $('.modal-open').prop('checked', false);
    location.reload();
  }

  setEstado(event) {
    if (!this.utils.nullOrUndef(event.target))
      this.pacienteCompleto.estado = event.target.value;
    else
      this.pacienteCompleto.estado = event;
    this.buscarCidades(this.pacienteCompleto.estado);
  }

  setCidade(event) {
    if (!this.utils.nullOrUndef(event.target))
      this.pacienteCompleto.cidade = event.target.value;
    else
      this.pacienteCompleto.cidade = event;
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

      let cidadeselecionada = this.pacienteCompleto.cidade;
      this.cidades.forEach((element, index) => {
        if (element.key == cidadeselecionada)
          element.selected = true;
      });
    },
      err => {
        console.log(err);
      });
  }

}
