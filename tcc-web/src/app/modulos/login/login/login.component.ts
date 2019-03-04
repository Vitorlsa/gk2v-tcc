import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private http: HttpClient) { }


  public users: object;
  public usuario = {
    name: "giu",
    senha: ""
  };
  public logado = false;

  ngOnInit() {
    this.getUsers().subscribe(data => {
      this.users = data;
      console.log(this.users);
    }
    );
  };


  getUsers() {
    return this.http.get('https://reqres.in/api/users')
  }

  logar() {
    if (this.usuario.name == "giu" && this.usuario.senha == "123") {
      this.logado = true;
    }
    else {
      this.logado = false;
    }
  }

}

