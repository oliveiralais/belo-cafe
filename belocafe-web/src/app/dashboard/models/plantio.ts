import { Atividade } from "./atividade";

export class Plantio {
  constructor(
    public tipoPlantio: string,
    public atividade: Atividade,
    public massaPlantio: number,
    public id?: number
  ) {}
}
