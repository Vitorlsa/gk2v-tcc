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
  public api = "http://localhost:8080/api/usuario/logar"
  public users: object;
  public usuario = {
    login: "",
    senha: ""
  };
  public logado = false;

  ngOnInit() {

  };


  getUsers() {
    return this.http.post(this.api,this.usuario).subscribe(data => 
      {
        if(data != null)
        {
          
          this.cookieService.set("usuarioLogado","teste");
          this.router.navigate(['/board']);
        }
      });
  }

  logar() {
    this.getUsers();
  }

  voltarHome() {
    this.router.navigate(['/home']);
  }

  cadastro() {
    this.router.navigate(['/cadastro']);
  }


}

