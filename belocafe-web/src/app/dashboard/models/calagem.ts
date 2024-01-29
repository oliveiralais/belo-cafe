import { Atividade } from "./atividade";

export class Calagem {
  constructor(
    public atividade: Atividade,
    public tipoCalcario: string,
    public qtdeCalcario: number,
    public id?: number
  ) {}
}
