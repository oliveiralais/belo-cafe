import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './containers/dashboard.component';
import { ListComprasComponent } from './pages/comprasExt/list-compras/list-compras.component';
import { NewCompraComponent } from './pages/comprasExt/new-compra/new-compra.component';
import { UpdateCompraComponent } from './pages/comprasExt/update-compra/update-compra.component';
import { ListEquipamentosComponent } from './pages/equipamentos/list-equipamentos/list-equipamentos.component';
import { NewEquipamentoComponent } from './pages/equipamentos/new-equipamento/new-equipamento.component';
import { UpdateEquipamentoComponent } from './pages/equipamentos/update-equipamento/update-equipamento.component';
import { ListFuncionariosComponent } from './pages/funcionarios/list-funcionarios/list-funcionarios.component';
import { NewFuncionarioComponent } from './pages/funcionarios/new-funcionario/new-funcionario.component';
import { UpdateFuncionarioComponent } from './pages/funcionarios/update-funcionario/update-funcionario.component';
import { ListGlebasComponent } from './pages/glebas/list-glebas/list-glebas.component';
import { NewGlebaComponent } from './pages/glebas/new-gleba/new-gleba.component';
import { UpdateGlebaComponent } from './pages/glebas/update-gleba/update-gleba.component';
import { HomeComponent } from './pages/home/home.component';
import { ListInsumosComponent } from './pages/insumos/list-insumos/list-insumos.component';
import { NewInsumoComponent } from './pages/insumos/new-insumo/new-insumo.component';
import { UpdateInsumoComponent } from './pages/insumos/update-insumo/update-insumo.component';
import { ListMaquinasComponent } from './pages/maquinas/list-maquinas/list-maquinas.component';
import { NewMaquinaComponent } from './pages/maquinas/new-maquina/new-maquina.component';
import { UpdateMaquinaComponent } from './pages/maquinas/update-maquina/update-maquina.component';
import { ListVeiculosComponent } from './pages/veiculos/list-veiculos/list-veiculos.component';
import { NewVeiculoComponent } from './pages/veiculos/new-veiculo/new-veiculo.component';
import { UpdateVeiculoComponent } from './pages/veiculos/update-veiculo/update-veiculo.component';
import { ListVendasComponent } from './pages/vendas/list-vendas/list-vendas.component';
import { NewVendaComponent } from './pages/vendas/new-venda/new-venda.component';
import { UpdateVendaComponent } from './pages/vendas/update-venda/update-venda.component';
import { ListGastosComponent } from './pages/gastos/list-gastos/list-gastos.component';
import { NewGastoComponent } from './pages/gastos/new-gastos/new-gasto.component';
import { UpdateGastoComponent } from './pages/gastos/update-gastos/update-gasto.component';
import { ListPlantiosComponent } from './pages/atividades/plantios/list-plantios/list-plantios.component';
import { NewPlantioComponent } from './pages/atividades/plantios/new-plantio/new-plantio.component';
import { UpdatePlantioComponent } from './pages/atividades/plantios/update-plantio/update-plantio.component';
import { ListAdubacoesComponent } from './pages/atividades/adubacoes/list-adubacoes/list-adubacoes.component';
import { NewAdubacaoComponent } from './pages/atividades/adubacoes/new-adubacao/new-adubacao.component';
import { UpdateAdubacaoComponent } from './pages/atividades/adubacoes/update-adubacao/update-adubacao.component';
import { ListBeneficiamentosComponent } from './pages/atividades/beneficiamentos/list-beneficiamentos/list-beneficiamentos.component';
import { NewBeneficiamentoComponent } from './pages/atividades/beneficiamentos/new-beneficiamento/new-beneficiamento.component';
import { UpdateBeneficiamentoComponent } from './pages/atividades/beneficiamentos/update-beneficiamento/update-beneficiamento.component';
import { ListCalagensComponent } from './pages/atividades/calagens/list-calagens/list-calagens.component';
import { NewCalagemComponent } from './pages/atividades/calagens/new-calagem/new-calagem.component';
import { UpdateCalagemComponent } from './pages/atividades/calagens/update-calagem/update-calagem.component';
import { ListColheitasComponent } from './pages/atividades/colheitas/list-colheitas/list-colheitas.component';
import { NewColheitaComponent } from './pages/atividades/colheitas/new-colheita/new-colheita.component';
import { UpdateColheitaComponent } from './pages/atividades/colheitas/update-colheita/update-colheita.component';
import { ListIrrigacoesComponent } from './pages/atividades/irrigacoes/list-irrigacoes/list-irrigacoes.component';
import { NewIrrigacaoComponent } from './pages/atividades/irrigacoes/new-irrigacao/new-irrigacao.component';
import { UpdateIrrigacaoComponent } from './pages/atividades/irrigacoes/update-irrigacao/update-irrigacao.component';
import { ListPulverizacoesComponent } from './pages/atividades/pulverizacoes/list-pulverizacoes/list-pulverizacoes.component';
import { NewPulverizacaoComponent } from './pages/atividades/pulverizacoes/new-pulverizacao/new-pulverizacao.component';
import { UpdatePulverizacaoComponent } from './pages/atividades/pulverizacoes/update-pulverizacao/update-pulverizacao.component';
import { AtividadesGlebaComponent } from './pages/relatorios/atividades-gleba/atividades-gleba.component';
import { AtividadesMaquinaComponent } from './pages/relatorios/atividades-maquina/atividades-maquina.component';
import { AtividadesEquipamentosComponent } from './pages/relatorios/atividades-equipamentos/atividades-equipamentos.component';
import { AtividadesVeiculosComponent } from './pages/relatorios/atividades-veiculos/atividades-veiculos.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      {
        path: '',
        component: HomeComponent,
      },
      {
        path: 'glebas',
        component: ListGlebasComponent,
      },
      {
        path: 'glebas/new',
        component: NewGlebaComponent,
      },
      {
        path: 'glebas/update/:id',
        component: UpdateGlebaComponent,
      },
      {
        path: 'insumos',
        component: ListInsumosComponent,
      },
      {
        path: 'insumos/new',
        component: NewInsumoComponent,
      },
      {
        path: 'insumos/update/:id',
        component: UpdateInsumoComponent,
      },
      {
        path: 'funcionarios',
        component: ListFuncionariosComponent,
      },
      {
        path: 'funcionarios/new',
        component: NewFuncionarioComponent,
      },
      {
        path: 'funcionarios/update/:id',
        component: UpdateFuncionarioComponent,
      },
      {
        path: 'maquinas',
        component: ListMaquinasComponent,
      },
      {
        path: 'maquinas/new',
        component: NewMaquinaComponent,
      },
      {
        path: 'maquinas/update/:id',
        component: UpdateMaquinaComponent,
      },
      {
        path: 'equipamentos',
        component: ListEquipamentosComponent,
      },
      {
        path: 'equipamentos/new',
        component: NewEquipamentoComponent,
      },
      {
        path: 'equipamentos/update/:id',
        component: UpdateEquipamentoComponent,
      },
      {
        path: 'veiculos',
        component: ListVeiculosComponent,
      },
      {
        path: 'veiculos/new',
        component: NewVeiculoComponent,
      },
      {
        path: 'veiculos/update/:id',
        component: UpdateVeiculoComponent,
      },
      {
        path: 'compras',
        component: ListComprasComponent,
      },
      {
        path: 'compras/new',
        component: NewCompraComponent,
      },
      {
        path: 'compras/update/:id',
        component: UpdateCompraComponent,
      },
      {
        path: 'vendas',
        component: ListVendasComponent,
      },
      {
        path: 'vendas/new',
        component: NewVendaComponent,
      },
      {
        path: 'vendas/update/:id',
        component: UpdateVendaComponent,
      },
      {
        path: 'gastos',
        component: ListGastosComponent
      },
      {
        path: 'gastos/new',
        component: NewGastoComponent
      },
      {
        path: 'gastos/update/:id',
        component: UpdateGastoComponent
      },
      {
        path: 'atividades/plantios',
        component: ListPlantiosComponent
      },
      {
        path: 'atividades/plantios/new',
        component: NewPlantioComponent
      },
      {
        path: 'atividades/plantios/update/:id',
        component: UpdatePlantioComponent
      },
      {
        path: 'atividades/adubacoes',
        component: ListAdubacoesComponent
      },
      {
        path: 'atividades/adubacoes/new',
        component: NewAdubacaoComponent
      },
      {
        path: 'atividades/adubacoes/update/:id',
        component: UpdateAdubacaoComponent
      },
      {
        path: 'atividades/beneficiamentos',
        component: ListBeneficiamentosComponent
      },
      {
        path: 'atividades/beneficiamentos/new',
        component: NewBeneficiamentoComponent
      },
      {
        path: 'atividades/beneficiamentos/update/:id',
        component: UpdateBeneficiamentoComponent
      },
      {
        path: 'atividades/calagens',
        component: ListCalagensComponent
      },
      {
        path: 'atividades/calagens/new',
        component: NewCalagemComponent
      },
      {
        path: 'atividades/calagens/update/:id',
        component: UpdateCalagemComponent
      },
      {
        path: 'atividades/colheitas',
        component: ListColheitasComponent
      },
      {
        path: 'atividades/colheitas/new',
        component: NewColheitaComponent
      },
      {
        path: 'atividades/colheitas/update/:id',
        component: UpdateColheitaComponent
      },
      {
        path: 'atividades/irrigacoes',
        component: ListIrrigacoesComponent
      },
      {
        path: 'atividades/irrigacoes/new',
        component: NewIrrigacaoComponent
      },
      {
        path: 'atividades/irrigacoes/update/:id',
        component: UpdateIrrigacaoComponent
      },
      {
        path: 'atividades/pulverizacoes',
        component: ListPulverizacoesComponent
      },
      {
        path: 'atividades/pulverizacoes/new',
        component: NewPulverizacaoComponent
      },
      {
        path: 'atividades/pulverizacoes/update/:id',
        component: UpdatePulverizacaoComponent
      },
      {
        path: 'relatorios/atividades-gleba',
        component: AtividadesGlebaComponent
      },
      {
        path: 'relatorios/atividades-maquina',
        component: AtividadesMaquinaComponent
      },
      {
        path: 'relatorios/atividades-equipamento',
        component: AtividadesEquipamentosComponent
      },
      {
        path: 'relatorios/atividades-veiculo',
        component: AtividadesVeiculosComponent
      }
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}
