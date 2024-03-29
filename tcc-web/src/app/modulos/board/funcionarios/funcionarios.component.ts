import { Component, OnInit } from '@angular/core';
import { Gestor } from 'src/app/classes/gestor';
import { Prestador } from 'src/app/classes/prestador';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { LoginService } from '../../login/login.service';
import { Usuario } from 'src/app/classes/usuario';
import { UtilsService } from 'src/app/funcoes/utils.service';

@Component({
  selector: 'app-funcionarios',
  templateUrl: './funcionarios.component.html',
  styleUrls: ['./funcionarios.component.scss']
})
export class FuncionariosComponent implements OnInit {

  constructor(private route: Router, private http: HttpClient, private loginService: LoginService, private utils: UtilsService) { }

  private apiListarGestores = "http://localhost:8080/api/gestor/listargestoresproximos";
  private apiListarPrestadores = "http://localhost:8080/api/gestor/listarprestadoresproximos";
  private apiBuscarContratante = "http://localhost:8080/api/contratante/buscar";
  private apiSolicitar = this.utils.server + "api/contratante/solicitarcontrato"

  public contrantante = new Usuario();
  public gestor = new Gestor();
  public prestadores = [new Prestador()];
  public todosGestores;
  public todosPrestadores;
  // public todosGestores = [new Gestor()];
  // public todosPrestadores = [new Prestador()];

  public buscarProfissionais = false;
  public perfilLogado = this.loginService.getSessionPerfil();


  ngOnInit() {
    //this.pegarVinculos();
    this.pegarDadosCOntratante();
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


  pegarVinculos(cidadeId) {
    this.pegarGestoresContratados(cidadeId);
    this.pegarPrestadoresContratados(cidadeId);
  }


  pegarDadosCOntratante() {
    this.http.post(this.apiBuscarContratante, { Id: this.loginService.getUsuario().id }).subscribe(data => {
      console.log(data);
      this.contrantante = <Usuario>data;
      this.pegarVinculos(this.contrantante.cidade);
    },
      err => {
        console.log(err);
      });
  }



  pegarPrestadoresContratados(cidadeId) {
    this.http.post(this.apiListarPrestadores, { Id: cidadeId }).subscribe(data => {
      console.log(data);
      this.todosPrestadores = data;
    },
      err => {
        console.log(err);
      });
  }


  pegarGestoresContratados(cidadeId) {
    this.http.post(this.apiListarGestores, { Id: cidadeId }).subscribe(data => {
      console.log(data);
      this.todosGestores = data;
    },
      err => {
        console.log(err);
      });
  }


  abreDetalhe(funcionario) {
    console.log(funcionario);
  }

  solicitar(contratado) {
    this.http.post(this.apiSolicitar, { 
      IdContratante: this.contrantante.id,
      IdUsuario: contratado.id
      })
    .subscribe(data => {
      alert("Solicitação realizada!")
    },
      err => {
        console.log(err);
      });
  }

  remover(funcionario) {
    console.log(funcionario);
  }

  voltarBoard() {
    this.route.navigate(['/board']);
  }
}