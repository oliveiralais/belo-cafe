import { User } from "./user";

export class Funcionario {
  constructor(
    public nome: string,
    public cpf: string,
    public telefone: string,
    public funcao: string,
    public salario: number,
    public usuario: User,
    public id?: number
  ){}
}
