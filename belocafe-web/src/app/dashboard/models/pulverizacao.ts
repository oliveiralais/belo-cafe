import { Atividade } from "./atividade";

export class Pulverizacao {
  constructor(
    public atividade: Atividade,
    public ocorrenciaAno: number,
    public id?: number,
    public diferencaQtdeInsumo?: number,
  ) {}
}
