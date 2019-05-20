import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(private router: Router, private cookieService: CookieService) { }

  private temPermissao = true;

  // private cookieValue;

  canActivate() {
    // this.cookieValue = this.cookieService.get('Test');

    //console.log(this.cookieValue);

    if (!this.temPermissao)
      return this.router.navigate(['/login']);


    return true;
  }

}
