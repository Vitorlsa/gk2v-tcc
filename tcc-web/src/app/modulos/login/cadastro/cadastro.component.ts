import { Component, OnInit } from '@angular/core';
import { LoginService } from '../login.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { UtilsService } from 'src/app/funcoes/utils.service';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.scss']
})
export class CadastroComponent implements OnInit {

  constructor(private http: HttpClient, private service: LoginService, private router: Router, private func: UtilsService) { }

  public usuario = {};
  public tipoCadastro = null;

  ngOnInit() {
    this.usuario = this.service.getUsuario();

    this.tipoCadastro = this.func.nullOrUndef(this.tipoCadastro);


    
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

  voltar(){
    this.router.navigate(['/login']);
  }

}
