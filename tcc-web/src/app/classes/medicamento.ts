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
    public posologiaId// 12 em 12, 8 em 8, 1x ao dia, etc...


    // constructor(){}
}
