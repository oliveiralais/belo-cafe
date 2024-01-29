import { Component } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router, ActivatedRoute } from '@angular/router';
import { User } from 'src/app/dashboard/models/user';
import { Atividade } from 'src/app/dashboard/models/atividade';
import { Beneficiamento } from 'src/app/dashboard/models/beneficiamento';
import { Equipamento } from 'src/app/dashboard/models/equipamento';
import { Funcionario } from 'src/app/dashboard/models/funcionario';
import { Gleba } from 'src/app/dashboard/models/gleba';
import { Maquina } from 'src/app/dashboard/models/maquina';
import { StatusAtividade } from 'src/app/dashboard/models/status-atividade';
import { Veiculo } from 'src/app/dashboard/models/veiculo';
import { AtividadeService } from 'src/app/dashboard/services/atividade.service';
import { BeneficiamentoService } from 'src/app/dashboard/services/beneficiamento.service';
import { EquipamentoService } from 'src/app/dashboard/services/equipamento.service';
import { FuncionarioService } from 'src/app/dashboard/services/funcionario.service';
import { GlebaService } from 'src/app/dashboard/services/gleba.service';
import { MaquinaService } from 'src/app/dashboard/services/maquina.service';
import { StatusAtividadeService } from 'src/app/dashboard/services/status-atividade.service';
import { VeiculoService } from 'src/app/dashboard/services/veiculo.service';
import { EquipamentoSelecaoComponent } from 'src/app/dashboard/shared/equipamento-selecao/equipamento-selecao.component';
import { FuncionarioSelecaoComponent } from 'src/app/dashboard/shared/funcionario-selecao/funcionario-selecao.component';
import { MaquinaSelecaoComponent } from 'src/app/dashboard/shared/maquina-selecao/maquina-selecao.component';
import { VeiculoSelecaoComponent } from 'src/app/dashboard/shared/veiculo-selecao/veiculo-selecao.component';

@Component({
  selector: 'app-update-beneficiamento',
  templateUrl: './update-beneficiamento.component.html',
  styleUrls: ['./update-beneficiamento.component.css']
})
export class UpdateBeneficiamentoComponent {
  beneficiamentoFormGroup!: FormGroup;
  atividade!: Atividade;
  beneficiamento!: Beneficiamento;
  beneficiamentoId!: number;
  user!: User;

  // Selections Data
  statusAtividades!: StatusAtividade[];
  glebas: Gleba[] = [];
  funcionarios: Funcionario[] = [];
  maquinas: Maquina[] = [];
  equipamentos: Equipamento[] = [];
  veiculos: Veiculo[] = [];

  // Custos
  custoFuncionarios: number = 0;
  custoMaquinas: number = 0;
  custoEquipamentos: number = 0;
  custoVeiculos: number = 0;
  custoPrevisto: number = 0;

  constructor(
    private atividadeService: AtividadeService,
    private beneficiamentoService: BeneficiamentoService,
    private statusAtividadesService: StatusAtividadeService,
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
    this.beneficiamentoId = this.route.snapshot.params['id'];
  }

  ngOnInit(): void {
    this.beneficiamentoFormGroup = this.formBuilder.group({
      tipoBeneficiamento: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(100),
      ]),

      rendimento: new FormControl('', [
        Validators.required,
        Validators.min(0),
        Validators.max(100)
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
    this.getBeneficiamento(this.beneficiamentoId);
    this.getStatusAtividades();
    this.getGlebas();
  }

  get tipoBeneficiamento() {
    return this.beneficiamentoFormGroup.get('tipoBeneficiamento');
  }

  get rendimento() {
    return this.beneficiamentoFormGroup.get('rendimento');
  }

  get despesasExtras() {
    return this.beneficiamentoFormGroup.get('despesasExtras');
  }

  get statusAtividade() {
    return this.beneficiamentoFormGroup.get('statusAtividade');
  }

  get local() {
    return this.beneficiamentoFormGroup.get('local');
  }

  get observacoes() {
    return this.beneficiamentoFormGroup.get('observacoes');
  }

  get dataInicio() {
    return this.beneficiamentoFormGroup.get('dataInicio');
  }

  get dataFim() {
    return this.beneficiamentoFormGroup.get('dataFim');
  }

  getUser(id: number): any {
    this.glebaService.getProprietary(id).subscribe({
      next: (user) => {
        this.user = user;
      },
    });
  }

  getBeneficiamento(id: number): any {
    this.beneficiamentoService.getById(id).subscribe({
      next: (beneficiamento) => {
        this.beneficiamento = beneficiamento;
        this.atividade = beneficiamento.atividade;

        this.tipoBeneficiamento!.setValue(beneficiamento.tipoBeneficiamento);
        this.rendimento!.setValue(beneficiamento.rendimento);

        this.atividadeService.getById(beneficiamento.atividade.id!).subscribe({
          next: (atividade) => {
            this.despesasExtras!.setValue(atividade.despesasExtras);

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
          },
        });
      },
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

  openFuncionarioDialog(event: MouseEvent) {
    event.preventDefault();

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
    this.custoVeiculos = 0;

    const duracaoAtividade = this.calcularDuracaoAtividade();
    const duracaoAtividadeMeses = duracaoAtividade / 30;

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

    this.custoPrevisto = this.custoFuncionarios + this.custoMaquinas + this.custoEquipamentos + this.custoVeiculos + Number(this.despesasExtras!.value);
  }

  createAtividade(): Atividade {
    return new Atividade (
      {id: 2, nome: 'BENEFICIAMENTO'},
      this.local!.value,
      this.statusAtividade!.value,
      this.dataInicio!.value,
      this.dataFim!.value,
      this.user,
      undefined,
      undefined,
      undefined,
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

  createBeneficiamento(): Beneficiamento {
    return new Beneficiamento(
      this.atividade,
      this.tipoBeneficiamento!.value,
      this.rendimento!.value,
      this.beneficiamento.id
    );
  }

  onSubmit(): void {
    if (this.beneficiamentoFormGroup.invalid) {
      this.beneficiamentoFormGroup.markAllAsTouched();
      return;
    } else {

      this.calcularCustoPrevisto();
      this.atividade = this.createAtividade();
      this.beneficiamento = this.createBeneficiamento();

      this.beneficiamentoService.update(this.beneficiamento).subscribe({
        next: () => {
          this.router.navigate(['/dashboard/atividades/beneficiamentos']);
        },

        error: (err) => {
          console.log('Error', err);
        },
      });
    }
  }
}
