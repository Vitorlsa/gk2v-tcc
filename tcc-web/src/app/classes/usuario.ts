import { Sexoenum } from '../enum/sexoenum.enum';
import { UsuarioEnum } from '../enum/usuario-enum.enum';

export class Usuario {
    public id:number;
    public nome: string;
    public login: string;
    public senha: string;
    public confirmaSenha: string;
    public email: string;
    public datanascimento: Date;
    public sexo: Sexoenum;
    public cpf: string;
    public telefone: string;
    public cidade: number;
    public comentario: string;
    public termos: boolean;
    public estado: string;
    public bairro: string;
    public cep: string;
    public rua: string;
    public numero: string;
    public complemento: string;
    public perfilLogado:UsuarioEnum;
    public imagem :string;


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






