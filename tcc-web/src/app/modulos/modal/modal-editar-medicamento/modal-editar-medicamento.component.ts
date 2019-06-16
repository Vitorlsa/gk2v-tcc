import { Component, OnInit, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CadastroServiceService } from '../../login/cadastro/cadastro-service.service';
import { UtilsService } from 'src/app/funcoes/utils.service';
import { Medicamento } from 'src/app/classes/medicamento';

@Component({
  selector: 'app-modal-editar-medicamento',
  templateUrl: './modal-editar-medicamento.component.html',
  styleUrls: ['./modal-editar-medicamento.component.scss']
})
export class ModalEditarMedicamentoComponent implements OnInit {

  constructor(private http: HttpClient, private cadastroService: CadastroServiceService, private utils: UtilsService) { }

  private apiDropTipoMedicamento = "http://localhost:8080/api/dropdown/tipomedicamento";
  private apiDropViaDeUso = "http://localhost:8080/api/dropdown/viadeusomedicamento";
  private apiCondicoes = "http://localhost:8080/api/dropdown/condicoesclinicas";

  private apiEditar = "http://localhost:8080/api/medicamento/editar";
  private apiDetalhar = "http://localhost:8080/api/medicamento/detalhar";

  public medicamentoCompleto = new Medicamento();
  public dataFormatada = "";
  public tipoMedicamentos: any[];
  public viaDeUsoMedicamentos: any[];



  @Input()
  medicamentoSelecionado

  ngOnInit() {
    this.buscarTipoMedicamentos();
    this.buscarViaDeUso();
    this.pegarInfosMedicamento(this.medicamentoSelecionado);
    $('.modal-open').prop('checked', true);
  }


  pegarInfosMedicamento(param) {
    try {
      this.http.post(this.apiDetalhar, { Id: param.id }).subscribe(data => {

        this.medicamentoCompleto = <Medicamento>data;
        // this.setTipoMedicamento(data.tipo);
        // this.setViaDeUso(data.viaDeUso);

        this.tipoMedicamentos.forEach((element) => {
          if (element.key == data.tipo) {
            element.selected = true;
          }
        });

        this.viaDeUsoMedicamentos.forEach((element) => {
          if (element.key == data.viaDeUso) {
            element.selected = true;
          }
        });

        // if (this.pacienteCompleto.sexo == 1)
        //   this.SexoSelecionado = "masculino";
        // else if (this.pacienteCompleto.sexo == 2)
        //   this.SexoSelecionado = "feminino";
        // else
        //   this.SexoSelecionado = "outro";
      })
    } catch{
      console.log("nao chamaou api");
    }
  }

  atualizarMedicamento(param) {

    console.log(param);
    try {

      if (this.utils.nullOrUndefOrEmpty(param.nome))
        throw "Preencha o nome";
      if (this.utils.nullOrUndefOrEmpty(param.tipo))
        throw "Escolha um tipo";
      if (this.utils.nullOrUndefOrEmpty(param.viaDeUso))
        throw "Escolha uma via de uso";

      param.Id = param.idMedicamento;
      param.Indicacao  = param.indicao;
      this.http.post(this.apiEditar, param).subscribe(
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

  setTipoMedicamento(event) {
    this.medicamentoCompleto.tipo = this.utils.nullOrUndef(event.target) ? event : event.target.value;
  }

  setViaDeUso(event) {
    this.medicamentoCompleto.viaDeUso = this.utils.nullOrUndef(event.target) ? event : event.target.value;
  }


  fechar() {
    // this.cadastroService.fecharModalEditarCallback();
    $('.modal-open').prop('checked', false);
    location.reload();
  }

}
