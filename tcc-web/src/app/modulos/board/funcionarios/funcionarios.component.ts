import { Component, OnInit } from '@angular/core';
import { Gestor } from 'src/app/classes/gestor';
import { Prestador } from 'src/app/classes/prestador';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-funcionarios',
  templateUrl: './funcionarios.component.html',
  styleUrls: ['./funcionarios.component.scss']
})
export class FuncionariosComponent implements OnInit {

  constructor(private route: Router, private http: HttpClient) { }

  public gestor = new Gestor();
  public prestadores = [new Prestador()];
  public todosGestores = [new Gestor()];
  public todosPrestadores = [new Prestador()];

  public buscarProfissionais = false;

  ngOnInit() {
    //this.pegarVinculos();


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


  pegarVinculos() {
    this.pegarGestoresContratados();
    this.pegarPrestadoresContratados();
  }


  pegarPrestadoresContratados() {
    throw new Error("Method not implemented.");
  }


  pegarGestoresContratados() {
    throw new Error("Method not implemented.");
  }


  abreDetalhe(funcionario) {
    console.log(funcionario);
  }



  solicitar() {

  }

  remover(funcionario) {
    console.log(funcionario);
  }




  voltarBoard() {
    this.route.navigate(['/board']);
  }



}
