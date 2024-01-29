import { Atividade } from "./atividade";

export class Colheita {
  constructor(
    public atividade: Atividade,
    public tipoColheita: string,
    public massaColhida: number,
    public rendimento: number,
    public id?: number
  ) {}
}
