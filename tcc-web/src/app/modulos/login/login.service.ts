import { Injectable } from '@angular/core';
import { Usuario } from 'src/app/classes/usuario';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor() { }

  private usuario = new Usuario();
  private pegaPerfil;
  

  guardaUsuario(usua) {
    this.usuario = usua;
    sessionStorage.setItem('usuarioLogado', JSON.stringify(this.usuario));
  }

  getUsuario() {
    return JSON.parse(sessionStorage.getItem('usuarioLogado'));
  }

  setPerfil(param) {
    this.usuario.perfilLogado = param;
  }

  getPerfil() {
    return this.usuario.perfilLogado;
  }

  perfilAtual(func){
    this.pegaPerfil = func;
  }

  atualizaPerfilAtual(){
    this.pegaPerfil();
  }


}
