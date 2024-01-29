import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatBadgeModule } from '@angular/material/badge';
import { MatMenuModule } from '@angular/material/menu';
import { MatDividerModule } from '@angular/material/divider';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatTableModule } from '@angular/material/table';
import { DashboardComponent } from './containers/dashboard.component';
import { HomeComponent } from './pages/home/home.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { NotificationsComponent } from './shared/header/components/notifications/notifications.component';
import { HeaderComponent } from './shared/header/container/header.component';
import { SidebarComponent } from './shared/sidebar/sidebar.component';
import { FooterComponent } from './shared/footer/footer.component';
import { UserComponent } from './shared/header/components/user/user.component';
import { SearchComponent } from './shared/header/components/search/search.component';
import { NgxEchartsModule } from 'ngx-echarts';
import { ListGlebasComponent } from './pages/glebas/list-glebas/list-glebas.component';
import { NewGlebaComponent } from './pages/glebas/new-gleba/new-gleba.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UpdateGlebaComponent } from './pages/glebas/update-gleba/update-gleba.component';
import { ConfirmDialogComponent } from './shared/confirm-dialog/confirm-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatRadioModule } from '@angular/material/radio';
import { ListInsumosComponent } from './pages/insumos/list-insumos/list-insumos.component';
import { NewInsumoComponent } from './pages/insumos/new-insumo/new-insumo.component';
import { UpdateInsumoComponent } from './pages/insumos/update-insumo/update-insumo.component';
import { MatSelectModule } from '@angular/material/select';
import { ListFuncionariosComponent } from './pages/funcionarios/list-funcionarios/list-funcionarios.component';
import { NewFuncionarioComponent } from './pages/funcionarios/new-funcionario/new-funcionario.component';
import { UpdateFuncionarioComponent } from './pages/funcionarios/update-funcionario/update-funcionario.component';
import { ListMaquinasComponent } from './pages/maquinas/list-maquinas/list-maquinas.component';
import { NewMaquinaComponent } from './pages/maquinas/new-maquina/new-maquina.component';
import { UpdateMaquinaComponent } from './pages/maquinas/update-maquina/update-maquina.component';
import { ListEquipamentosComponent } from './pages/equipamentos/list-equipamentos/list-equipamentos.component';
import { NewEquipamentoComponent } from './pages/equipamentos/new-equipamento/new-equipamento.component';
import { UpdateEquipamentoComponent } from './pages/equipamentos/update-equipamento/update-equipamento.component';
import { ListVeiculosComponent } from './pages/veiculos/list-veiculos/list-veiculos.component';
import { NewVeiculoComponent } from './pages/veiculos/new-veiculo/new-veiculo.component';
import { UpdateVeiculoComponent } from './pages/veiculos/update-veiculo/update-veiculo.component';
import { ListComprasComponent } from './pages/comprasExt/list-compras/list-compras.component';
import { NewCompraComponent } from './pages/comprasExt/new-compra/new-compra.component';
import { UpdateCompraComponent } from './pages/comprasExt/update-compra/update-compra.component';
import { ListVendasComponent } from './pages/vendas/list-vendas/list-vendas.component';
import { NewVendaComponent } from './pages/vendas/new-venda/new-venda.component';
import { UpdateVendaComponent } from './pages/vendas/update-venda/update-venda.component';
import { ListGastosComponent } from './pages/gastos/list-gastos/list-gastos.component';
import { NewGastoComponent } from './pages/gastos/new-gastos/new-gasto.component';
import { UpdateGastoComponent } from './pages/gastos/update-gastos/update-gasto.component';
import { ListPlantiosComponent } from './pages/atividades/plantios/list-plantios/list-plantios.component';
import { NewPlantioComponent } from './pages/atividades/plantios/new-plantio/new-plantio.component';
import { UpdatePlantioComponent } from './pages/atividades/plantios/update-plantio/update-plantio.component';
import { FuncionarioSelecaoComponent } from './shared/funcionario-selecao/funcionario-selecao.component';
import { MaquinaSelecaoComponent } from './shared/maquina-selecao/maquina-selecao.component';
import { EquipamentoSelecaoComponent } from './shared/equipamento-selecao/equipamento-selecao.component';
import { VeiculoSelecaoComponent } from './shared/veiculo-selecao/veiculo-selecao.component';
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

@NgModule({
  declarations: [
    DashboardComponent,
    HomeComponent,
    NotificationsComponent,
    HeaderComponent,
    SidebarComponent,
    FooterComponent,
    UserComponent,
    SearchComponent,
    ListGlebasComponent,
    NewGlebaComponent,
    UpdateGlebaComponent,
    ConfirmDialogComponent,
    ListInsumosComponent,
    NewInsumoComponent,
    UpdateInsumoComponent,
    ListFuncionariosComponent,
    NewFuncionarioComponent,
    UpdateFuncionarioComponent,
    ListMaquinasComponent,
    NewMaquinaComponent,
    UpdateMaquinaComponent,
    ListEquipamentosComponent,
    NewEquipamentoComponent,
    UpdateEquipamentoComponent,
    ListVeiculosComponent,
    NewVeiculoComponent,
    UpdateVeiculoComponent,
    ListComprasComponent,
    NewCompraComponent,
    UpdateCompraComponent,
    ListVendasComponent,
    NewVendaComponent,
    UpdateVendaComponent,
    ListGastosComponent,
    NewGastoComponent,
    UpdateGastoComponent,
    ListPlantiosComponent,
    NewPlantioComponent,
    UpdatePlantioComponent,
    FuncionarioSelecaoComponent,
    MaquinaSelecaoComponent,
    EquipamentoSelecaoComponent,
    VeiculoSelecaoComponent,
    ListAdubacoesComponent,
    NewAdubacaoComponent,
    UpdateAdubacaoComponent,
    ListBeneficiamentosComponent,
    NewBeneficiamentoComponent,
    UpdateBeneficiamentoComponent,
    ListCalagensComponent,
    NewCalagemComponent,
    UpdateCalagemComponent,
    ListColheitasComponent,
    NewColheitaComponent,
    UpdateColheitaComponent,
    ListIrrigacoesComponent,
    NewIrrigacaoComponent,
    UpdateIrrigacaoComponent,
    ListPulverizacoesComponent,
    NewPulverizacaoComponent,
    UpdatePulverizacaoComponent,
    AtividadesGlebaComponent,
    AtividadesMaquinaComponent,
    AtividadesEquipamentosComponent,
    AtividadesVeiculosComponent,
  ],
  imports: [
    CommonModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    DashboardRoutingModule,
    MatBadgeModule,
    MatMenuModule,
    MatDividerModule,
    MatInputModule,
    MatFormFieldModule,
    MatCardModule,
    NgxEchartsModule.forChild(),
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatDialogModule,
    MatRadioModule,
    MatSelectModule,
    MatCheckboxModule,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class DashboardModule {}
