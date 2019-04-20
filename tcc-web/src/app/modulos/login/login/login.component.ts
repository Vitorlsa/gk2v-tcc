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

  cookieValue = 'UNKNOWN';  
  public users: object;
  public usuario = {
    name: "giu",
    senha: ""
  };
  public logado = false;
  private url = "https://reqres.in";

  ngOnInit() {


    this.cookieService.set( 'Test', 'Hello World' );
    this.cookieValue = this.cookieService.get('Test');

    console.log(this.cookieValue);

    this.getUsers().subscribe(data => {
      this.users = data;
      console.log(this.users);
    }
    );
  };


  getUsers() {
    return this.http.get(this.url + '/api/users')
  }

  logar() {
    if (this.usuario.name == "giu" && this.usuario.senha == "123") {
      this.logado = true;
    }
    else {
      this.logado = false;
    }

    this.service.teste();

    // this.service.guardaUsuario(this.usuario);
    // this.http.post(this.url + "/api/users", this.usuario).subscribe(data => {
    //   console.log(data);
      this.router.navigate(['/board']);
    // })
  }

  voltarHome(){
      this.router.navigate(['/home']);
  }

  cadastro() {
    this.router.navigate(['/cadastro']);
  }


}

