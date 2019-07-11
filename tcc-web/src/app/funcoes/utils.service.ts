import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  constructor() { }


  nullOrUndef(obj) {
    return obj === undefined || obj == null;
  }

  nullOrUndefOrEmpty(obj) {
    return obj === undefined || obj == null || obj === "";
  }

  // conversores de dados data, sexo, estado, cidade | competencias
  converteDataServer(data) {
    let dataConvertida = null;
    //implementar
    return dataConvertida;
  }

  converteSexoServer(sexo) {
    let sexoConvertido = "";
    if (sexo == 1)
      sexoConvertido = "Masculino";
    else if (sexo == 2)
      sexoConvertido = "Femininno";
    else
      sexoConvertido = "Outro";
    return sexoConvertido;
  }

  converteEstadoServer(estado) {
    let estadoConvertido = null;
    // implementar
    return estadoConvertido;
  }

  converteCidadeServer(cidade) {
    let cidadeConvertida = null;
    // implementar
    return cidadeConvertida;
  }

  competenciasstadoServer(competencias) {
    let competenciasConvertido = [];
    // implementar
    return competenciasConvertido;
  }

}
