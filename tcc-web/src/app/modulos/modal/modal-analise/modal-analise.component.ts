import { Component, OnInit, Input } from '@angular/core';
import { DatePipe } from '@angular/common';
import { registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';
registerLocaleData(localePt);

@Component({
  selector: 'app-modal-analise',
  templateUrl: './modal-analise.component.html',
  styleUrls: ['./modal-analise.component.scss']
})
export class ModalAnaliseComponent implements OnInit {

  constructor() { }

  public dataFormatada = null;


  @Input()
  cadastroSelecionado

  ngOnInit() {
    this.dataFormatada = new DatePipe('pt-BR').transform(this.cadastroSelecionado.dataNascimento, 'dd/MM/yyyy');
  }


  fecha() {
    $('.modal-open').prop('checked', false);
  }




}
