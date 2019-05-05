import { Usuario } from './usuario';

export class Paciente extends Usuario{

    public condicoesClinicas:string;
    public IdContratante: Number;

    constructor(){
        super();
    }

}
