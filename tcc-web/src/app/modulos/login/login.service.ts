import { Injectable } from '@angular/core';
import { Usuario } from 'src/app/classes/usuario';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor() { }

  private usuario = new Usuario();
  private pegaPerfil;
  private perfis = []
  

  guardaUsuario(usua) {
    this.usuario = usua;
    sessionStorage.setItem('usuarioLogado', JSON.stringify(this.usuario));
    this.guardaPerfil(usua);
  }

  guardaPerfil(usua){
    this.perfis = []
    usua.acessos.forEach(element => {
      this.perfis.push(element.perfil);
    });
     sessionStorage.setItem('tipoPerfil', JSON.stringify(this.perfis));
  }

  getSessionPerfil(){
    return JSON.parse(sessionStorage.tipoPerfil);
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
  
  setAcessos(param){
    sessionStorage.setItem('acessos', JSON.stringify(param));
  }

  getAcessos() {
    return JSON.parse(sessionStorage.getItem('acessos'));
  }


}
