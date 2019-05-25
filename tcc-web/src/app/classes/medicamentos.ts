import { Paciente } from './paciente';

export class Medicamentos extends Paciente {

    public IdBeneficiario: number;
    public IdMedicamento: number;
    public Nome: string
    public ContraIndicacao: string
    public Bula: string
    public Indicao: string
    public Tipo: number ///comprimido, gota, efervece
    public ViaDeUso: number ///oral, etc
    public EfeitoColateral: string


    // constructor(){}
}
