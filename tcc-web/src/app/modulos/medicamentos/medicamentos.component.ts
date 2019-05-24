import { Component, OnInit } from '@angular/core';
import { UtilsService } from 'src/app/funcoes/utils.service';
import { CadastroServiceService } from '../login/cadastro/cadastro-service.service';
import { LoginService } from '../login/login.service';
import { HttpClient } from '@angular/common/http';

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
  private apiDetahar = "http://localhost:8080/api/medicamento/detalhar";
  private apiRemover = "http://localhost:8080/api/medicamento/remover"
  private contratante = this.service.getUsuario();
  public medicamento = {};
  public novoMedicamento = false;
  public medicamentosPaciente = null;
  public dataFormatada = null;
  public perfilMedicamento = null



  ngOnInit() {

    this.listarRemedios();

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


  listarRemedios() {
    try {
      this.http.post(this.apiListar, { Id: this.contratante.id }).subscribe(data => {
        this.medicamentosPaciente = [];
        this.medicamentosPaciente = data;
        // this.medicamentosPaciente.forEach((element, index) => {
        //   this.medicamentosPaciente[index].dataFormatada = new DatePipe('pt-BR').transform(element.dataValidade, 'dd/MM/yyyy');
        // });
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
    try {
      this.http.post(this.apicadastrar, this.medicamento).subscribe(data => {
        console.log(data);
        // this.medicamentosPaciente.forEach((element, index) => {
        //   this.medicamentosPaciente[index].dataFormatada = new DatePipe('pt-BR').transform(element.dataValidade, 'dd/MM/yyyy');
        // });
      })
    } catch{
      console.log("nao chamaou api");
    }
  }

  voltar() {
    this.novoMedicamento = false;
  }

}
