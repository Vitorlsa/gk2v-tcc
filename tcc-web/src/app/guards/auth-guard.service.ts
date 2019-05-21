import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { LoginService } from '../modulos/login/login.service';
import { element } from '@angular/core/src/render3';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(private router: Router, private loginService: LoginService) { }

  private temPermissao = false;
  


  canActivate() {
    let urlAtual = window.location.pathname;
    let permissoesPerfil = this.loginService.getAcessos();
    // urlAtual = '/board';
    let temPermissao = false;

    permissoesPerfil.forEach(element => {
      if (element.path == urlAtual)
        temPermissao = true;
    });

    this.temPermissao = temPermissao;
    if (!this.temPermissao)
      return this.router.navigate(['/login']);


    return true;
  }

}
