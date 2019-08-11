import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { UtilsService } from 'src/app/funcoes/utils.service';
import { ModalperfilComponent } from '../../modal/modalperfil/modalperfil.component';
import { ModalAnaliseComponent } from '../../modal/modal-analise/modal-analise.component';

@Component({
  selector: 'app-analise-cadastro',
  templateUrl: './analise-cadastro.component.html',
  styleUrls: ['./analise-cadastro.component.scss']
})
export class AnaliseCadastroComponent implements OnInit {

  constructor(private http: HttpClient, private router: Router, public util: UtilsService) { }

  public gestores = null;
  public contratantes = null;
  public prestadores = null;
  //public cadastroSelecionado = null;
  private apiContratante = "http://localhost:8080/api/contratante/listarnaoaprovados";
  private apiPrestador = "http://localhost:8080/api/prestadordeservico/listarnaoaprovados";
  private apiGestor = "http://localhost:8080/api/gestor/listarnaoaprovados";
  private apiDeletar = "http://localhost:8080/api/usuario/deletar";
  private apiAprovar = "http://localhost:8080/api/usuario/analisar";



  ngOnInit() {
    this.listarContratante();
    this.listarGestor();
    this.listarPrestador();


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

  @Output()
  emitir = new EventEmitter<any>();
  cadastroSelecionado = null;

  aprovar(id, param, tipo) {
    try {
      this.http.post(this.apiAprovar, { Id: id, Aprovado: param }).subscribe(data => {
        console.log(data);
        if (param)
          alert("Aprovado!");
        else
          alert("Reprovado!");
        if (tipo == 1)
          this.listarContratante();
        else if (tipo == 2)
          this.listarGestor();
        else if (tipo == 3)
          this.listarPrestador();
      })
    } catch{
      console.log("nao chamaou api");
    }
  }

  deletarUser(id, tipo) {
    try {
      this.http.post(this.apiDeletar, { Id: id }).subscribe(data => {
        console.log(data);
        alert("Deletado!");
        if (tipo == 1)
          this.listarContratante();
        else if (tipo == 2)
          this.listarGestor();
        else if (tipo == 3)
          this.listarPrestador();
      })
    } catch{
      console.log("nao chamaou api");
    }
  }


  listarContratante() {
    try {
      this.http.post(this.apiContratante, {}).subscribe(data => {
        this.contratantes = data;
        console.log(data);
      })
    } catch{
      console.log("nao chamaou api");
    }
  }

  listarGestor() {
    try {
      this.http.post(this.apiGestor, {}).subscribe(data => {
        this.gestores = data;
        console.log(data);
      })
    } catch{
      console.log("nao chamaou api");
    }
  }

  listarPrestador() {
    try {
      this.http.post(this.apiPrestador, {}).subscribe(data => {
        this.prestadores = data;
        console.log(data);
      })
    } catch{
      console.log("nao chamaou api");
    }
  }


  abreDetalhe(cadastro) {
    console.log(cadastro);
    this.cadastroSelecionado = cadastro;
    console.log(!this.util.nullOrUndef(this.cadastroSelecionado));
    this.emitir.emit(this.cadastroSelecionado);
    $('.modal-open').prop('checked', true);
  }

  voltarBoard() {
    this.router.navigate(['/board']);
  }

  modalFechada(listar: boolean) {
    this.cadastroSelecionado = null;
  }

}
