import { Atividade } from "./atividade";

export class Beneficiamento {
  constructor(
    public atividade: Atividade,
    public tipoBeneficiamento: string,
    public rendimento: number,
    public id?: number
  ) {}
}
