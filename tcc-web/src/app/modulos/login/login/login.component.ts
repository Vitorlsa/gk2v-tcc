import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoginService } from '../login.service';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { UsuarioEnum } from 'src/app/enum/usuario-enum.enum';



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
  private api = "http://localhost:8080/api/usuario/logar";
  public enun: UsuarioEnum

  ngOnInit() {
    console.log(UsuarioEnum.Contratante == 1);
    console.log(this.enun == 1);
    this.enun = UsuarioEnum.Contratante;
    console.log(this.enun);
  };


  logar() {
    this.http.post(this.api, { login: this.usuario.name, senha: this.usuario.senha }).subscribe(data => {
      this.users = data;
      this.service.guardaUsuario(this.usuario);
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

