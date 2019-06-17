import { Paciente } from './paciente';

export class Medicamento {

    public idBeneficiario: number;
    public nome: string
    public contraIndicacao: string
    public bula: string
    public indicacao: string
    public tipo: number ///comprimido, gota, efervece
    public viaDeUso: number ///oral, etc
    public efeitoColateral: string


    // constructor(){}
}
