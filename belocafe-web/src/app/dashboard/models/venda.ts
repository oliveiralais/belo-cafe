import { User } from './user';

export class Venda {
  constructor(
    public id: number,
    public data: string,
    public valor: number,
    public qtdCafe: number,
    public usuario: User
  ) {}
}
