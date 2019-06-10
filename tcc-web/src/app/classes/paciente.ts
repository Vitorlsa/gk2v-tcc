import { Sexoenum } from '../enum/sexoenum.enum';

export class Paciente{

    public nome: string;
    public dataNascimento: Date;
    public sexo: Sexoenum;
    public cpf: string;
    public telefone: string;
    public cidade: number;
    public comentario: string;
    public termoDeResponsalidade: boolean;
    public estado: string;
    public bairro: string;
    public cep: string;
    public rua: string;
    public numero: string;
    public complemento: string;
    public condicoesClinicas: Array<number>;
    public IdContratante: Number;


    constructor() { }


    setSexo(sexo) {
        this.sexo = sexo;
    }

    getSexo() {
     return this.sexo;
    }

    setTermos(termos) {
        this.termoDeResponsalidade = termos;
    }

    getTermos() {
     return this.termoDeResponsalidade;
    }
   

}
