import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoginService } from '../login.service';
import { Router } from '@angular/router';
import { CadastroComponent } from '../cadastro/cadastro.component';
import { CookieService } from 'ngx-cookie-service';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private http: HttpClient, private service: LoginService, private router: Router, private cookieService: CookieService) { }

  cookieValue = {};
  public users: object;
  public usuario = {
    name: "",
    senha: ""
  };
  public logado = false;
  //private url = "https://reqres.in";
  private api = "http://localhost:8080/api/usuario/logar";

  ngOnInit() {

  };


  logar() {
    if (this.usuario.name == "giu" && this.usuario.senha == "123") {
      this.logado = true;
    }
    else {
      this.logado = false;
    }

    this.service.teste();


    this.http.post(this.api, { login: this.usuario.name, senha: this.usuario.senha }).subscribe(data => {
      this.users = data;
      console.log(this.users);
      this.service.guardaUsuario(this.usuario);
      this.cookieService.set('Test', this.users.toString());
      this.cookieValue = this.cookieService.getAll();
      console.log(this.cookieValue);
      this.router.navigate(['/board']);
    }
    );
  }

  voltarHome() {
    this.router.navigate(['/home']);
  }

  cadastro() {
    this.router.navigate(['/cadastro']);
  }


}

