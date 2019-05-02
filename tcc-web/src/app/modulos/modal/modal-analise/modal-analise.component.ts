import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-modal-analise',
  templateUrl: './modal-analise.component.html',
  styleUrls: ['./modal-analise.component.scss']
})
export class ModalAnaliseComponent implements OnInit {

  constructor() { }
  
  @Input()
  cadastroSelecionado

  ngOnInit() {
    console.log("cadastro");
    console.log(this.cadastroSelecionado);
    //if(this.cadastroSelecionado.acessos[0]){}
  }


  fecha() {
    $('.modal-open').prop('checked', false);
  }




}
