import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoginService } from '../login.service';
import { Router } from '@angular/router';
import { UsuarioEnum } from 'src/app/enum/usuario-enum.enum';
import { UtilsService } from 'src/app/funcoes/utils.service';
import { utils } from 'protractor';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public users: Object;

  constructor(private http: HttpClient, private service: LoginService, private router: Router, private util: UtilsService) { }

  public api = "http://localhost:8080/api/usuario/logar"
  public usuario = {
    login: "",
    senha: ""
  };
  public logado = false;
  public enun: UsuarioEnum

  ngOnInit() {
    console.log(UsuarioEnum.Contratante == 1);
    console.log(this.enun == 1);
    this.enun = UsuarioEnum.Contratante;
    console.log(this.enun);
    sessionStorage.clear();
  };


  logar() {
    this.http.post(this.api, { login: this.usuario.login, senha: this.usuario.senha }).subscribe(data => {
      if (!this.util.nullOrUndef(data)) {
        this.users = data;
        console.log(this.users);
        this.service.guardaUsuario(this.users);

        // var usuario = this.service.getUsuario();
        // console.log(usuario);
        // this.service.setAcessos(usuario.acessos);


        this.router.navigate(['/board']);
      } else
        alert("Usuario nao existe");
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

