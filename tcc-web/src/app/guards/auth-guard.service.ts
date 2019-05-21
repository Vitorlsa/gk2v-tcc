import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { LoginService } from '../modulos/login/login.service';
import { element } from '@angular/core/src/render3';
import { UtilsService } from '../funcoes/utils.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(private router: Router, private loginService: LoginService, private util: UtilsService) { }

  private temPermissao = false;



  canActivate() {
    let urlAtual = window.location.pathname;
    let permissoesPerfil = this.loginService.getAcessos();


    if (this.util.nullOrUndefOrEmpty(permissoesPerfil))
      return this.router.navigate(['/login']);
    // urlAtual = '/board';
    let temPermissao = false;

    permissoesPerfil.forEach(element => {
      if (element.path == urlAtual)
        temPermissao = true;
    });

    this.temPermissao = temPermissao;
    if (!this.temPermissao && urlAtual != '/board')
      return this.router.navigate(['/board']);
    else if(!this.temPermissao && urlAtual == '/board')
      return this.router.navigate(['/login']);


    return true;
  }

}
