import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { DatePipe } from '@angular/common';
import { registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';
import { HttpClient } from '@angular/common/http';
registerLocaleData(localePt);

@Component({
  selector: 'app-modal-analise',
  templateUrl: './modal-analise.component.html',
  styleUrls: ['./modal-analise.component.scss']
})
export class ModalAnaliseComponent implements OnInit {

  constructor(private http:HttpClient) { }

  public dataFormatada = null;
private api = "http://localhost:8080/api/usuario/dadoscadastrais";

  @Input()
  cadastroSelecionado

  ngOnInit() {
    console.log(this.cadastroSelecionado);
    this.trazerDados(this.cadastroSelecionado.id)
    this.dataFormatada = new DatePipe('pt-BR').transform(this.cadastroSelecionado.dataNascimento, 'dd/MM/yyyy');
  }


trazerDados(id){
  try {
    this.http.post(this.api, { Id: id}).subscribe(data => {
      this.cadastroSelecionado = data;
    })
  } catch{
    console.log("nao chamaou api");
  }
}

  fecha() {
    $('.modal-open').prop('checked', false);
  }

  @Output()
  fecharModal = new EventEmitter<any>();

  fechar(listar: boolean) {
    //this.utils.nullOrUndef(listar) ? false : listar;
    this.fecharModal.emit(listar);
    //$('.modal-open').prop('checked', false);
    //location.reload();
  }


}
