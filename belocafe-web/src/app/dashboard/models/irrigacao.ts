import { Atividade } from "./atividade";

export class Irrigacao {
  constructor(
    public atividade: Atividade,
    public tipoIrrigacao: string,
    public fertirrigacao: boolean,
    public id?: number
  ) {}
}
