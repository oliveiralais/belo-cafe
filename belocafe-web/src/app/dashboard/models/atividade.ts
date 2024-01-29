import { Equipamento } from "./equipamento";
import { Funcionario } from "./funcionario";
import { Gleba } from "./gleba";
import { Insumo } from "./insumo";
import { Maquina } from "./maquina";
import { StatusAtividade } from "./status-atividade";
import { TipoAtividade } from "./tipo-atividade";
import { User } from "./user";
import { Veiculo } from "./veiculo";

export class Atividade {
  constructor(
    public tipoAtividade: TipoAtividade,
    public local: Gleba,
    public statusAtividade: StatusAtividade,
    public dataInicio: Date,
    public dataFim: Date,
    public usuario: User,
    public insumo?: Insumo,
    public qtdeInsumo?: number,
    public custoInsumos?: number,
    public funcionarios?: Funcionario[],
    public custoFuncionarios?: number,
    public maquinas?: Maquina[],
    public custoMaquinas?: number,
    public equipamentos?: Equipamento[],
    public custoEquipamentos?: number,
    public veiculos?: Veiculo[],
    public custoVeiculos?: number,
    public despesasExtras?: number,
    public custoPrevisto?: number,
    public observacoes?: string,
    public id?: number
  ){}
}
