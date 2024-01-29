import { Component } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router, ActivatedRoute } from '@angular/router';
import { User } from 'src/app/dashboard/models/user';
import { Atividade } from 'src/app/dashboard/models/atividade';
import { Equipamento } from 'src/app/dashboard/models/equipamento';
import { Funcionario } from 'src/app/dashboard/models/funcionario';
import { Gleba } from 'src/app/dashboard/models/gleba';
import { Insumo } from 'src/app/dashboard/models/insumo';
import { Maquina } from 'src/app/dashboard/models/maquina';
import { Pulverizacao } from 'src/app/dashboard/models/pulverizacao';
import { StatusAtividade } from 'src/app/dashboard/models/status-atividade';
import { Veiculo } from 'src/app/dashboard/models/veiculo';
import { AtividadeService } from 'src/app/dashboard/services/atividade.service';
import { EquipamentoService } from 'src/app/dashboard/services/equipamento.service';
import { FuncionarioService } from 'src/app/dashboard/services/funcionario.service';
import { GlebaService } from 'src/app/dashboard/services/gleba.service';
import { InsumoService } from 'src/app/dashboard/services/insumo.service';
import { MaquinaService } from 'src/app/dashboard/services/maquina.service';
import { PulverizacaoService } from 'src/app/dashboard/services/pulverizacao.service';
import { StatusAtividadeService } from 'src/app/dashboard/services/status-atividade.service';
import { VeiculoService } from 'src/app/dashboard/services/veiculo.service';
import { EquipamentoSelecaoComponent } from 'src/app/dashboard/shared/equipamento-selecao/equipamento-selecao.component';
import { FuncionarioSelecaoComponent } from 'src/app/dashboard/shared/funcionario-selecao/funcionario-selecao.component';
import { MaquinaSelecaoComponent } from 'src/app/dashboard/shared/maquina-selecao/maquina-selecao.component';
import { VeiculoSelecaoComponent } from 'src/app/dashboard/shared/veiculo-selecao/veiculo-selecao.component';

@Component({
  selector: 'app-update-pulverizacao',
  templateUrl: './update-pulverizacao.component.html',
  styleUrls: ['./update-pulverizacao.component.css']
})
export class UpdatePulverizacaoComponent {
  pulverizacaoFormGroup!: FormGroup;
  atividade!: Atividade;
  pulverizacao!: Pulverizacao;
  pulverizacaoId!: number;
  user!: User;
  insumoInicial!: Insumo;

  // Selections Data
  statusAtividades!: StatusAtividade[];
  glebas: Gleba[] = [];
  insumos: Insumo[] = [];
  funcionarios: Funcionario[] = [];
  maquinas: Maquina[] = [];
  equipamentos: Equipamento[] = [];
  veiculos: Veiculo[] = [];

  // Custos
  qtdeInsumoInicial: number = 0;
  diferencaQtdeInsumo: number = 0;
  custoInsumos: number = 0;
  custoFuncionarios: number = 0;
  custoMaquinas: number = 0;
  custoEquipamentos: number = 0;
  custoVeiculos: number = 0;
  custoPrevisto: number = 0;

  constructor(
    private pulverizacaoService: PulverizacaoService,
    private atividadeService: AtividadeService,
    private statusAtividadesService: StatusAtividadeService,
    private insumoService: InsumoService,
    private glebaService: GlebaService,
    private funcionarioService: FuncionarioService,
    private maquinaService: MaquinaService,
    private equipamentoService: EquipamentoService,
    private veiculoService: VeiculoService,
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private dialog: MatDialog
  ) {
    this.pulverizacaoId = this.route.snapshot.params['id'];
  }

  ngOnInit(): void {
    this.pulverizacaoFormGroup = this.formBuilder.group({
      insumo: new FormControl('', [
        Validators.required,
      ]),

      qtdeInsumo: new FormControl('', [
        Validators.required,
        Validators.min(0)
      ]),

      ocorrenciaAno: new FormControl('', [
        Validators.required,
        Validators.min(0)
      ]),

      despesasExtras: new FormControl('', [
        Validators.min(0)
      ]),

      statusAtividade: new FormControl('', [
        Validators.required,
      ]),

      dataInicio: new FormControl('', [
        Validators.required,
      ]),

      dataFim: new FormControl('', [
        Validators.required,
      ]),

      local: new FormControl('', [
        Validators.required,
      ]),

      observacoes: new FormControl('')
    });

    this.getUser(+localStorage.getItem('user_id')!);
    this.getPulverizacao(this.pulverizacaoId);
    this.getStatusAtividades();
    this.getGlebas();
    this.getInsumos();

    this.insumo?.valueChanges.subscribe((insumo) => {
      this.qtdeInsumo?.clearValidators();
      if(this.insumoInicial && insumo && this.insumoInicial.id === insumo.id)
        this.qtdeInsumo?.setValidators([Validators.required, Validators.min(0), Validators.max(this.qtdeInsumoInicial + this.insumo!.value.quantidadeDisponivel)]);
      else
        this.qtdeInsumo?.setValidators([Validators.required, Validators.min(0), Validators.max(insumo.quantidadeDisponivel)]);
      this.qtdeInsumo?.updateValueAndValidity();
    });
  }

  get insumo() {
    return this.pulverizacaoFormGroup.get('insumo');
  }

  get qtdeInsumo() {
    return this.pulverizacaoFormGroup.get('qtdeInsumo');
  }

  get ocorrenciaAno() {
    return this.pulverizacaoFormGroup.get('ocorrenciaAno');
  }

  get despesasExtras() {
    return this.pulverizacaoFormGroup.get('despesasExtras');
  }

  get statusAtividade() {
    return this.pulverizacaoFormGroup.get('statusAtividade');
  }

  get local() {
    return this.pulverizacaoFormGroup.get('local');
  }

  get observacoes() {
    return this.pulverizacaoFormGroup.get('observacoes');
  }

  get dataInicio() {
    return this.pulverizacaoFormGroup.get('dataInicio');
  }

  get dataFim() {
    return this.pulverizacaoFormGroup.get('dataFim');
  }

  getDiferencaQtdeInsumo(): void {
    this.diferencaQtdeInsumo = this.qtdeInsumo!.value - this.qtdeInsumoInicial;
  }

  getUser(id: number): any {
    this.glebaService.getProprietary(id).subscribe({
      next: (user) => {
        this.user = user;
      },
    });
  }

  getPulverizacao(id: number): any {
    this.pulverizacaoService.getById(id).subscribe({
      next: (pulverizacao) => {
        this.pulverizacao = pulverizacao;
        this.atividade = pulverizacao.atividade;
        this.ocorrenciaAno!.setValue(pulverizacao.ocorrenciaAno);

        this.atividadeService.getById(pulverizacao.atividade.id!).subscribe({
          next: (atividade) => {
            this.despesasExtras!.setValue(atividade.despesasExtras);

            this.insumos.forEach((insumo) => {
              if (insumo.id === atividade.insumo!.id) {
                this.insumo!.setValue(insumo);
                this.insumoInicial = insumo;
              }
            })

            this.statusAtividades.forEach((statusAtividade) => {
              if (statusAtividade.id === atividade.statusAtividade.id) {
                this.statusAtividade!.setValue(statusAtividade);
              }
            });

            this.glebas.forEach((gleba) => {
              if (gleba.id === atividade.local.id) {
                this.local!.setValue(gleba);
              }
            });

            this.qtdeInsumo!.setValue(atividade.qtdeInsumo);
            this.qtdeInsumoInicial = atividade.qtdeInsumo || 0;
            this.custoInsumos = atividade.custoInsumos || 0;
            this.dataInicio!.setValue(atividade.dataInicio.toString().substring(0, 10));
            this.dataFim!.setValue(atividade.dataFim.toString().substring(0, 10));
            this.observacoes!.setValue(atividade.observacoes);
            this.funcionarios = atividade.funcionarios || [];
            this.custoFuncionarios = atividade.custoFuncionarios || 0;
            this.maquinas = atividade.maquinas || [];
            this.custoMaquinas = atividade.custoMaquinas || 0;
            this.equipamentos = atividade.equipamentos || [];
            this.custoEquipamentos = atividade.custoEquipamentos || 0;
            this.veiculos = atividade.veiculos || [];
            this.custoVeiculos = atividade.custoVeiculos || 0;

            this.qtdeInsumo?.setValidators([Validators.required, Validators.min(0), Validators.max(this.qtdeInsumoInicial + this.insumo!.value.quantidadeDisponivel)]);
            this.qtdeInsumo?.updateValueAndValidity();

            this.getDiferencaQtdeInsumo();
          },
        });
      }
    });
  }

  getStatusAtividades(): any {
    this.statusAtividadesService.getAll().subscribe({
      next: (status) => {
        this.statusAtividades = status;
      },
    });
  }

  getGlebas(): any {
    this.glebaService.getAll().subscribe({
      next: (glebas) => {
        this.glebas = glebas;
      },
    });
  }

  getInsumos(): any {
    this.insumoService.findByTipoInsumoPaginate(2, +localStorage.getItem('user_id')!, 0, 100).subscribe({
      next: (insumos) => {
        this.insumos = insumos._embedded.insumos;
      },
    });
  }

  openFuncionarioDialog(event: MouseEvent) {
    event.preventDefault();
    console.log(this.qtdeInsumo!.value)

    this.funcionarioService.getAllByUsuarioId(+localStorage.getItem('user_id')!).subscribe((funcionarios) => {
      const dialogRef = this.dialog.open(FuncionarioSelecaoComponent, {
        data: { funcionarios, selected: this.funcionarios },
      });

      dialogRef.afterClosed().subscribe((result) => {
        if(result)
          this.funcionarios = result;
      });
    });
  }

  openMaquinaDialog(event: MouseEvent) {
    event.preventDefault();

    this.maquinaService.getAllByUsuarioId(+localStorage.getItem('user_id')!).subscribe((maquinas) => {
      const dialogRef = this.dialog.open(MaquinaSelecaoComponent, {
        data: { maquinas, selected: this.maquinas },
      });

      dialogRef.afterClosed().subscribe((result) => {
        if(result)
          this.maquinas = result;
      });
    });
  }

  openEquipamentoDialog(event: MouseEvent) {
    event.preventDefault();

    this.equipamentoService.getAllByUsuarioId(+localStorage.getItem('user_id')!).subscribe((equipamentos) => {
      const dialogRef = this.dialog.open(EquipamentoSelecaoComponent, {
        data: { equipamentos, selected: this.equipamentos },
      });

      dialogRef.afterClosed().subscribe((result) => {
        if(result)
          this.equipamentos = result;
      });
    });
  }

  openVeiculoDialog(event: MouseEvent) {
    event.preventDefault();

    this.veiculoService.getAllByUsuarioId(+localStorage.getItem('user_id')!).subscribe((veiculos) => {
      const dialogRef = this.dialog.open(VeiculoSelecaoComponent, {
        data: { veiculos, selected: this.veiculos },
      });

      dialogRef.afterClosed().subscribe((result) => {
        if(result)
          this.veiculos = result;
      });
    });
  }

  calcularDuracaoAtividade(): number {
    const ONE_DAY = 1000 * 60 * 60 * 24;

    const inicio = new Date(this.dataInicio!.value);
    const fim = new Date(this.dataFim!.value);

    // Calculate the difference in milliseconds
    const differenceMs = Math.abs(fim.getTime() - inicio.getTime());

    // Convert back to days and return
    return Math.round(differenceMs / ONE_DAY);
  }

  calcularCustoPrevisto(){
    this.custoFuncionarios = 0;
    this.custoMaquinas = 0;
    this.custoEquipamentos = 0;
    this.custoInsumos = 0;
    this.custoVeiculos = 0;

    const duracaoAtividade = this.calcularDuracaoAtividade();
    const duracaoAtividadeMeses = duracaoAtividade / 30;

    this.custoInsumos = this.insumo!.value.valor! * this.qtdeInsumo!.value;

    this.funcionarios.forEach(funcionario => {
      this.custoFuncionarios += funcionario.salario! * duracaoAtividadeMeses;
    });

    this.maquinas.forEach(maquina => {
      this.custoMaquinas += maquina.manutencao! * duracaoAtividadeMeses;
    });

    this.equipamentos.forEach(equipamento => {
      this.custoEquipamentos += equipamento.manutencao! * duracaoAtividadeMeses;
    });

    this.veiculos.forEach(veiculo => {
      this.custoVeiculos += veiculo.manutencao! * duracaoAtividadeMeses;
    });

    this.custoPrevisto = this.custoInsumos + this.custoFuncionarios + this.custoMaquinas + this.custoEquipamentos + this.custoVeiculos + Number(this.despesasExtras!.value);
  }

  createAtividade(): Atividade {
    return new Atividade (
      {id: 7, nome: 'PULVERIZACAO'},
      this.local!.value,
      this.statusAtividade!.value,
      this.dataInicio!.value,
      this.dataFim!.value,
      this.user!,
      this.insumo!.value,
      this.qtdeInsumo!.value,
      this.custoInsumos,
      this.funcionarios,
      this.custoFuncionarios,
      this.maquinas,
      this.custoMaquinas,
      this.equipamentos,
      this.custoEquipamentos,
      this.veiculos,
      this.custoVeiculos,
      this.despesasExtras!.value,
      this.custoPrevisto,
      this.observacoes!.value,
      this.atividade.id
    );
  }

  createPulverizacao(): Pulverizacao {
    return new Pulverizacao(
      this.atividade,
      this.ocorrenciaAno!.value,
      this.pulverizacaoId,
      this.diferencaQtdeInsumo
    );
  }

  onSubmit(): void {
    if (this.pulverizacaoFormGroup.invalid) {
      this.pulverizacaoFormGroup.markAllAsTouched();
      return;
    } else {

      this.getDiferencaQtdeInsumo();
      this.calcularCustoPrevisto();
      this.atividade = this.createAtividade();
      this.pulverizacao = this.createPulverizacao();

      this.pulverizacaoService.update(this.pulverizacao).subscribe({
        next: () => {
          this.router.navigate(['/dashboard/atividades/pulverizacoes']);
        },

        error: (err) => {
          console.log('Error', err);
        },
      });
    }
  }
}
