import { Atividade } from "./atividade";

export class Adubacao {
  constructor(
    public atividade: Atividade,
    public ocorrenciaAno: number,
    public id?: number,
    public diferencaQtdeInsumo?: number,
  ) {}
}
