import { Injectable } from '@angular/core';
import { UtilsService } from 'src/app/funcoes/utils.service';

@Injectable({
  providedIn: 'root'
})
export class CadastroServiceService {

  constructor(private utils:UtilsService) { }


  setSexo() {

  }

  setTermos() {

  }

  validaCadastro(usuario) {
    if (usuario.senha != usuario.confirmaSenha)
      return false;
    if (usuario.termos == 0)
      return false;

    for (var key in usuario) {
      if(this.utils.nullOrUndefOrEmpty(usuario[key]))
      return false;
    }

    return true
  }


}
