import { User } from './user';

export class CompraExt {
  constructor(
    public titulo: string,
    public codigo: string,
    public valor: number,
    public razaoSocial: string,
    public cpfCnpj: string,
    public descricao: string,
    public data: string,
    public usuario: User,
    public id?: number
  ) {}
}
