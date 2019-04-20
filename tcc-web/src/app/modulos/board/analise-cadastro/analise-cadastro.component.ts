import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-analise-cadastro',
  templateUrl: './analise-cadastro.component.html',
  styleUrls: ['./analise-cadastro.component.scss']
})
export class AnaliseCadastroComponent implements OnInit {

  constructor() { }

  public cadastros = [];
  public cadastrado = { nome: "Orandi", desc: ["enfermeiro", "cuidador"] };


  ngOnInit() {
    this.cadastros.push(this.cadastrado);
  }

  aprovar(cadastro) {
    console.log("aprovado" + cadastro);
  }

  reprovar(cadastro) {
    console.log("reprovado" + cadastro);
  }
}
