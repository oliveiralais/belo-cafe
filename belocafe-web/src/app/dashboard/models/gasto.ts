import { User } from "./user";

export class Gasto {
  constructor(
    public type: string,
    public code: number,
    public description: string,
    public amount: number,
    public issueDate: string,
    public name: string,
    public cpfCnpj: string,
    public usuario: User,
    public id?: number,
  ){}
}
