import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-analise-cadastro',
  templateUrl: './analise-cadastro.component.html',
  styleUrls: ['./analise-cadastro.component.scss']
})
export class AnaliseCadastroComponent implements OnInit {

  constructor(private http: HttpClient) { }

  public gestores = null;
  public contratantes = null;
  public prestadores = null;
  // public cadastrado = { nome: "Orandi", desc: ["enfermeiro", "cuidador"] };
  private apiContratante = "http://localhost:8080/api/contratante/listarnaoaprovados";
  private apiPrestador = "http://localhost:8080/api/prestadordeservico/listarnaoaprovados";
  private apiGestor = "http://localhost:8080/api/gestor/listarnaoaprovados";
  private apiDeletar = "http://localhost:8080/api/usuario/deletar"

  ngOnInit() {
    //this.cadastros.push(this.cadastrado);
    this.listarContratante();
    this.listarGestor();
    this.listarPrestador();
  }

  aprovar(cadastro) {
    console.log("aprovado" + cadastro);
  }

  reprovar(cadastro) {
    console.log("reprovado" + cadastro);
  }

  deletarUser(id, tipo) {
    try {
      this.http.post(this.apiDeletar, { Id: id }).subscribe(data => {
        console.log(data);
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

}
