import { Component, OnInit, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import localePt from '@angular/common/locales/pt';
import { registerLocaleData } from '@angular/common';
import { DatePipe } from '@angular/common';
import { CadastroServiceService } from '../../login/cadastro/cadastro-service.service';
import { isNullOrUndefined } from 'util';
import { UtilsService } from 'src/app/funcoes/utils.service';
import { timingSafeEqual } from 'crypto';
registerLocaleData(localePt);

@Component({
  selector: 'app-modal-editar-paciente',
  templateUrl: './modal-editar-paciente.component.html',
  styleUrls: ['./modal-editar-paciente.component.scss']
})
export class ModalEditarPacienteComponent implements OnInit {

  constructor(private http: HttpClient, private cadastroService: CadastroServiceService, private util: UtilsService) { }

  private apiBuscar = "http://localhost:8080/api/beneficiario/buscarporid";
  private apiSalvar = "http://localhost:8080/api/beneficiario/editar";
  private apiEstados = "http://localhost:8080/api/dropdown/estados";
  private apiCidades = "http://localhost:8080/api/dropdown/cidadeporestado";
  private apiCondicoes = "http://localhost:8080/api/dropdown/condicoesclinicas";

  public pacienteCompleto = null;

  public cidades = null;
  public estados = null;
  public estadoSelecionado = null;
  public cidadeSelecionada = null;

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
  }

  pegarInfosBeneficiario(param) {
    try {
      this.http.post(this.apiBuscar, { Id: param.id }).subscribe(data => {
        console.log(data);
        this.pacienteCompleto = data;
        this.pacienteCompleto.dataFormatada = new DatePipe('pt-BR').transform(this.pacienteCompleto.dataNascimento, 'dd/MM/yyyy');
        if (this.pacienteCompleto.sexo == 1)
          this.pacienteCompleto.sexo = "masculino";
        else if (this.pacienteCompleto.sexo == 2)
          this.pacienteCompleto.sexo = "feminino";
        else
          this.pacienteCompleto.sexo = "outro";

        // this.setEstado(this.pacienteCompleto.estado);
        console.log(this.pacienteCompleto.estado);
        console.log(this.estados);
        let estadoselecionado = this.pacienteCompleto.estado;
        this.estados.forEach((element, index) => {
          if (index == estadoselecionado)
            estadoselecionado = element;
        });
        this.estadoSelecionado = estadoselecionado;
        console.log(estadoselecionado);
        console.log(this.pacienteCompleto.estado);

        this.buscarCidades(this.pacienteCompleto.estado)


      })
    } catch{
      console.log("nao chamaou api");
    }
  }

  atualizarBeneficiario(param) {
    if (this.pacienteCompleto.sexo == "masculino")
      this.pacienteCompleto.sexo = 1;
    else if (this.pacienteCompleto.sexo == "feminino")
      this.pacienteCompleto.sexo = 2
    else
      this.pacienteCompleto.sexo = 3;


    try {
      this.http.post(this.apiSalvar, param).subscribe(
        res => {
          alert("Cadastro salvo com sucesso");
          this.fechar();
        },
        err => {
          console.log(err);
        });
    } catch{
      console.log("nao chamaou api");
    }
  }


  buscarCondicoesClinicas() {
    this.http.post(this.apiCondicoes, {}).subscribe(data => {
      console.log(data);
      this.condicoesClinicas = Object.values(data);
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
    if (!this.util.nullOrUndef(event.target))
      this.pacienteCompleto.estado = event.target.value;
    else
      this.pacienteCompleto.estado = event;
    this.buscarCidades(this.pacienteCompleto.estado);
  }

  setCidade(event) {
    if (!this.util.nullOrUndef(event.target))
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
        if (element == cidadeselecionada)
          console.log(index);
      });
    },
      err => {
        console.log(err);
      });
  }

}
