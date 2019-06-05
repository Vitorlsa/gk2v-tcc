import { Sexoenum } from '../enum/sexoenum.enum';

export class Paciente{

    public nome: string;
    public datanascimento: Date;
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
<<<<<<< HEAD
    public condicoesClinicas: Array<number>;
=======
    public condicoesClinicas = null;
>>>>>>> e7f033b5e708d9be077abf139298ca4f11168404
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
