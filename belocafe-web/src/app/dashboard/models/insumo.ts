import { TipoInsumo } from "./tipo-insumo";
import { User } from "./user";

export class Insumo {
  constructor(
    public nome: string,
    public alvo: string,
    public principioAtivo: string,
    public unidade: string,
    public valor: number,
    public quantidadeAdquirida: number,
    public quantidadeDisponivel: number,
    public valorTotal: number,
    public tipoInsumo: TipoInsumo,
    public detalhamentoTipo: string,
    public usuario: User,
    public id?: number,
  ){}
}
