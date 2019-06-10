import { Injectable } from '@angular/core';
import { UtilsService } from 'src/app/funcoes/utils.service';
import { CadastroContratanteComponent } from './cadastro-contratante/cadastro-contratante.component';
import { HttpClient } from '@angular/common/http';
import { throws } from 'assert';

@Injectable({
  providedIn: 'root'
})
export class CadastroServiceService {
  contratante: any;
  fecharCallback: any;

  constructor(private utils: UtilsService, private http: HttpClient) { }

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
    let [year, month, day] = dateStr.split("-");
    day = day.slice(0, 2);
    return new Date(year, month - 1, day)
  }

  calculateAge(birthday) { // birthday is a date
    var ageDifMs = Date.now() - birthday.getTime();
    var ageDate = new Date(ageDifMs); // miliseconds from epoch
    return Math.abs(ageDate.getUTCFullYear() - 1970);
  }


  salvarCadastro(cadastro, tipo) {
    if (cadastro.senha != cadastro.confirmaSenha)
      throw "Senhas não são iguais";
    if (cadastro.termos == 0)
      throw "Senhas não são iguais";
    if (this.calculateAge(cadastro.idade) >= 18)
      throw "Deve ter no mínimo 18 anos para se cadastrar";
    if (cadastro.confirmaSenha.length >= 6 && cadastro.senha.length >= 6)
      throw "Precisam ter ao menos 6 caracteres";
    if (this.validateEmail(cadastro.email))
      throw "E-mail não é válido";
    if (this.testaCPF(cadastro.cpf))
      throw "CPF não é válido";


    return
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
