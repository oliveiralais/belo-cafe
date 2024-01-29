import { User } from "./user";

export class Maquina {
  constructor(
    public nome: string,
    public descricao: string,
    public fabricante: string,
    public anoFabricacao: number,
    public modelo: string,
    public valorCompra: number,
    public dataCompra: Date,
    public depreciacao: number,
    public manutencao: number,
    public usuario: User,
    public id?: number
  ){}
}
