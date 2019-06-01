import { Sexoenum } from '../enum/sexoenum.enum';

export class Paciente{

    public nome: string;
    public datanascimento: Date;
    public sexo: Sexoenum;
    public cpf: string;
    public telefone: string;
    public cidade: string;
    public comentario: string;
    public termos: boolean;
    public estado: string;
    public bairro: string;
    public cep: string;
    public rua: string;
    public numero: string;
    public complemento: string;
    public condicoesClinicas:string;
    public IdContratante: Number;


    constructor() { }


    setSexo(sexo) {
        this.sexo = sexo;
    }

    getSexo() {
     return this.sexo;
    }

    setTermos(termos) {
        this.termos = termos;
    }

    getTermos() {
     return this.termos;
    }
   

}
