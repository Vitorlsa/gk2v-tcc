import { Injectable } from '@angular/core';
import { UtilsService } from 'src/app/funcoes/utils.service';
import { CadastroContratanteComponent } from './cadastro-contratante/cadastro-contratante.component';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CadastroServiceService {
  contratante: any;
  fecharCallback: any;

  constructor(private utils: UtilsService, private http: HttpClient) { }


  // setSexo() {

  // }

  // setTermos() {

  // }

  validaCadastro(usuario) {
    if (usuario.senha != usuario.confirmaSenha)
      return false;
    if (usuario.termos == 0)
      return false;

    for (var key in usuario) {
      if (this.utils.nullOrUndefOrEmpty(usuario[key]))
        return false;
    }

    return true
  }

  setContratantePaciente(contratante) {
    this.contratante = contratante;
  }

  getContratantePaciente() {
    return this.contratante;
  }

// setfecharModalEditarCallback(func){
// this.fecharCallback = func;
// }

// fecharModalEditarCallback(){
//   return this.fecharCallback();
// }


private apiverificarCpf = "http://localhost:8080/api/usuario/verificarcpfcadastrado"

verificarCpf(cpf){
  try {
    this.http.post(this.apiverificarCpf, { Id: this.contratante.id }).subscribe(data => {
      return data;
    })
  } catch{
    console.log("nao chamaou api");
  }
}


}
