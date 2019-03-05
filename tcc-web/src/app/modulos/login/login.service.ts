import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor() { }

  usuario = {};

  guardaUsuario(usua) {
    this.usuario = usua;
  }

  getUsuario(){
    return this.usuario;
  }

  teste() {
    console.log("service");
  }
}
