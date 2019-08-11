import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CadastroServiceService } from '../../login/cadastro/cadastro-service.service';
import { Medicamento } from 'src/app/classes/medicamento';
import { UtilsService } from 'src/app/funcoes/utils.service';

@Component({
  selector: 'app-modal-medicamento-beneficiario',
  templateUrl: './modal-medicamento-beneficiario.component.html',
  styleUrls: ['./modal-medicamento-beneficiario.component.scss']
})
export class ModalMedicamentoBeneficiarioComponent implements OnInit {

  constructor(private http: HttpClient, private cadastroService: CadastroServiceService, private utils: UtilsService) { }

  private apiDropPosologia = "http://localhost:8080/api/dropdown/posologia";
  private apiEditar = "http://localhost:8080/api/beneficiario/editarmedicamento";
  private apiDetalhar = "http://localhost:8080/api/beneficiario/detalhesmedicamento";

  public medicamentoCompleto = new Medicamento();
  public posologiaMedicamento: any[];



  @Input()
  medicamentoSelecionado

  ngOnInit() {
    $('.modal-open').prop('checked', true);
    this.buscarPosologia();
    this.pegarInfosMedicamento(this.medicamentoSelecionado);
  }


  pegarInfosMedicamento(param) {
    try {
      this.http.post(this.apiDetalhar, { Id: param.id }).subscribe(data => {

        this.medicamentoCompleto = <Medicamento>data;
        let retorno = this.medicamentoCompleto;
        retorno = retorno.posologiaId;

        this.posologiaMedicamento.forEach((element) => {
          if (element.key == retorno) {
            element.selected = true;
          }
        });

      })
    } catch{
      console.log("nao chamaou api");
    }
  }

  atualizarMedicamento(param) {

    console.log(param);
    try {

      if (this.utils.nullOrUndefOrEmpty(param.quantidade))
        throw "Insira uma quantidade";

      param.Id = param.idMedicamento;
      param.MedicamentoId = param.medicamentoId;
      param.PosologiaId = param.posologiaId;
      param.Quantidade = param.quantidade;

      this.http.post(this.apiEditar, param).subscribe(
        res => {
          alert("Medicamento atualizado");
          this.fechar(true);
        },
        err => {
          console.log(err);
        });
    } catch (e) {
      alert(e);
    }
  }

  buscarPosologia() {
    this.http.post(this.apiDropPosologia, {}).subscribe(data => {
      console.log(data);
      this.posologiaMedicamento = Object.values(data);
    });
  }

  setPosologia(event) {
    this.medicamentoCompleto.posologiaId = this.utils.nullOrUndef(event.target) ? event : event.target.value;
  }

  @Output()
  emitir = new EventEmitter<any>();
  pacienteSelecionado = null;


 editarPaciente(param) {
    this.pacienteSelecionado = param;
    this.emitir.emit(this.pacienteSelecionado);
  }

  @Output()
  fecharModal = new EventEmitter<any>();

  fechar(listar: boolean) {
    this.utils.nullOrUndef(listar) ? false : listar;
    this.fecharModal.emit(listar);
    $('.modal-open').prop('checked', false);
  }



}
