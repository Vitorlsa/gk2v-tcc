import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-analise-cadastro',
  templateUrl: './analise-cadastro.component.html',
  styleUrls: ['./analise-cadastro.component.scss']
})
export class AnaliseCadastroComponent implements OnInit {

  constructor(private http: HttpClient) { }

  public cadastros = [];
  public cadastrado = { nome: "Orandi", desc: ["enfermeiro", "cuidador"] };
  private api = "";

  ngOnInit() {
    this.cadastros.push(this.cadastrado);
    this.listarPendencias();
  }

  aprovar(cadastro) {
    console.log("aprovado" + cadastro);
  }

  reprovar(cadastro) {
    console.log("reprovado" + cadastro);
  }

  listarPendencias() {
    try {
      this.http.post(this.api, {}).subscribe(data => {
        console.log(data);
      })
    } catch{
      console.log("nao chamaou api");
    }
  }

}
