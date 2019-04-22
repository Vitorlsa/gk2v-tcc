import { Component, OnInit } from '@angular/core';
import { LoginService } from '../login.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { UtilsService } from 'src/app/funcoes/utils.service';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.scss']
})
export class CadastroComponent implements OnInit {

  constructor(private http: HttpClient, private service: LoginService, private router: Router, private func: UtilsService) { }

  public usuario = {};
  public tipoCadastro = null;

  ngOnInit() {
    this.service.teste();
    this.usuario = this.service.getUsuario();

    this.tipoCadastro = this.func.nullOrUndef(this.tipoCadastro);

  }

  voltar(){
    this.router.navigate(['/login']);
  }

}
