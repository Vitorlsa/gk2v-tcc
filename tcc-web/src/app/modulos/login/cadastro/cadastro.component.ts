import { Component, OnInit } from '@angular/core';
import { LoginService } from '../login.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.scss']
})
export class CadastroComponent implements OnInit {

  constructor(private http: HttpClient, private service:LoginService, private router: Router) { }

public usuario = {};


  ngOnInit() {
    this.service.teste();


    this.usuario = this.service.getUsuario();
  }


  voltarLogin(){
    this.router.navigate(['']);

  }

}
