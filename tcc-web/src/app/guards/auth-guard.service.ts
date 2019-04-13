import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(private router: Router) { }

  private temPermissao = false;

  canActivate() {

    if (!this.temPermissao)
      return this.router.navigate(['/login']);

  }

}
