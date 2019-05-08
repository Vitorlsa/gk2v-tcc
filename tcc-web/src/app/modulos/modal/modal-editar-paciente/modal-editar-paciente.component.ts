import { Component, OnInit, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import localePt from '@angular/common/locales/pt';
import { registerLocaleData } from '@angular/common';
import { DatePipe } from '@angular/common';
registerLocaleData(localePt);

@Component({
  selector: 'app-modal-editar-paciente',
  templateUrl: './modal-editar-paciente.component.html',
  styleUrls: ['./modal-editar-paciente.component.scss']
})
export class ModalEditarPacienteComponent implements OnInit {

  constructor(private http: HttpClient) { }

  private apiBuscar = "http://localhost:8080/api/beneficiario/buscarporid";
  private apiSalvar = "http://localhost:8080/api/beneficiario/editar";
  public pacienteCompleto = null;


  @Input()
  pacienteSelecionado

  ngOnInit() {
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
      })
    } catch{
      console.log("nao chamaou api");
    }
  }

  atualizarBeneficiario(param) {
    param.dataNascimento = param.dataFormatada;
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
        },
        err => {
          console.log(err);
        });
    } catch{
      console.log("nao chamaou api");
    }
  }

  fechar() {
    $('.modal-open').prop('checked', false);
  }


}
