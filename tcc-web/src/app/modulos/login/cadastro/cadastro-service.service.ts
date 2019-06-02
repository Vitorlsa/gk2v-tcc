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

  testaCPF(strCPF) {
    var Soma;
    var Resto;
    Soma = 0;
    if (strCPF == "00000000000") return false;

    for (let i = 1; i <= 9; i++) Soma = Soma + parseInt(strCPF.substring(i - 1, i)) * (11 - i);
    Resto = (Soma * 10) % 11;

    if ((Resto == 10) || (Resto == 11)) Resto = 0;
    if (Resto != parseInt(strCPF.substring(9, 10))) return false;

    Soma = 0;
    for (let i = 1; i <= 10; i++) Soma = Soma + parseInt(strCPF.substring(i - 1, i)) * (12 - i);
    Resto = (Soma * 10) % 11;

    if ((Resto == 10) || (Resto == 11)) Resto = 0;
    if (Resto != parseInt(strCPF.substring(10, 11))) return false;
    return true;
  }

  validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    console.log(re.test(String(email).toLowerCase()));
    return re.test(String(email).toLowerCase());
  }

  toDate(dateStr) {
    const [year, month, day] = dateStr.split("-");
    return new Date(year, month - 1, day)
  }

  calculateAge(birthday) { // birthday is a date
    var ageDifMs = Date.now() - birthday.getTime();
    var ageDate = new Date(ageDifMs); // miliseconds from epoch
    return Math.abs(ageDate.getUTCFullYear() - 1970);
  }

  // setfecharModalEditarCallback(func){
  // this.fecharCallback = func;
  // }

  // fecharModalEditarCallback(){
  //   return this.fecharCallback();
  // }


  //private apiverificarCpf = "http://localhost:8080/api/usuario/verificarcpfcadastrado"

  // verificarCpf(cpf){
  //   try {
  //     this.http.post(this.apiverificarCpf, { Cpf: cpf }).subscribe(data => {
  //       return data;
  //     })
  //   } catch{
  //     console.log("nao chamaou api");
  //   }
  //   return false;
  // }


}
