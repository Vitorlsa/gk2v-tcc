import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoginService } from '../login.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private http: HttpClient, private service: LoginService, private router: Router) { }


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

    this.service.teste();

    this.service.guardaUsuario(this.usuario);

    this.router.navigate(['/cadastro']);

    // this.http.post("url", this.usuario).subscribe(data => {
    //   alert(data);
    // })


  }

}

