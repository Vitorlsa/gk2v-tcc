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

  private apiSalvar = "http://localhost:8080/api/beneficiario/adicionar";
  private apiListar = "http://localhost:8080/api/beneficiario/listarporcontratante";
  private contratante = this.service.getUsuario();
  public medicamento = {};
  public novoMedicamento = false;
  public todosMedicamento = null;
  public dataFormatada = null;
  public perfilMedicamento = null



  ngOnInit() {

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

  }



  criarNovoRemedio() {
    this.novoMedicamento = true;
  }

  salvar() {
console.log(this.medicamento);
  }

  voltar() { 
    this.novoMedicamento = false;
  }

}
