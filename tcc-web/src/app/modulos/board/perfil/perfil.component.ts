import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../login/login.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss']
})
export class PerfilComponent implements OnInit {

  constructor(private service: LoginService) { }

  public usuaLogado = null;

  ngOnInit() {
    this.usuaLogado = this.service.getUsuario();
    console.log(this.usuaLogado);
  }

}
