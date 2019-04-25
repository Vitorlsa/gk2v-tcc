import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor() { }

  usuario = {};

  guardaUsuario(usua) {
    this.usuario = usua;
    sessionStorage.setItem('usuarioLogado',JSON.stringify(this.usuario));
  }

  getUsuario(){
    return JSON.parse(sessionStorage.getItem('usuarioLogado'));
  }

}
