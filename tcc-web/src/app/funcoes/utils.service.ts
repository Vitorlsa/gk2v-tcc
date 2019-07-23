import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  constructor() { }

  public server = "http://localhost:8080/";

  nullOrUndef(obj) {
    return obj === undefined || obj == null;
  }

  nullOrUndefOrEmpty(obj) {
    return obj === undefined || obj == null || obj === "";
  }

  // conversores de dados DO SERVER data, sexo, estado, cidade | competencias
  modelToDate(dateStr) {
    let [year, month, day] = dateStr.split("-");
    day = day.slice(0, 2);
    return new Date(year, month - 1, day).toISOString().substring(0, 10);
  }

  dateToString(dateStr) {
    let [year, month, day] = dateStr.split("-");
    day = day.slice(0, 2);
    return (day + "-" + month + "-" + year).toString();
  }

  converteSexoServer(sexo) {
    let sexoConvertido = "";
    if (sexo == 1)
      sexoConvertido = "Masculino";
    else if (sexo == 2)
      sexoConvertido = "Feminino";
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


// conversores de dados DA MODEL data, sexo, estado, cidade | competencias
converteSexoModel(sexo) {
  let sexoConvertido = null;
  if (sexo == "Masculino")
    sexoConvertido = 1;
  else if (sexo == "Feminino")
    sexoConvertido = 2;
  else
    sexoConvertido = 3;
  return sexoConvertido;
}


}
