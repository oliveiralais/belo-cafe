import { Component } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/dashboard/models/user';
import { Plantio } from 'src/app/dashboard/models/plantio';
import { PlantioService } from 'src/app/dashboard/services/plantio.service';
import { StatusAtividade } from 'src/app/dashboard/models/status-atividade';
import { StatusAtividadeService } from 'src/app/dashboard/services/status-atividade.service';
import { Gleba } from 'src/app/dashboard/models/gleba';
import { GlebaService } from 'src/app/dashboard/services/gleba.service';
import { Atividade } from 'src/app/dashboard/models/atividade';
import { Funcionario } from 'src/app/dashboard/models/funcionario';
import { FuncionarioService } from 'src/app/dashboard/services/funcionario.service';
import { MatDialog } from '@angular/material/dialog';
import { FuncionarioSelecaoComponent } from 'src/app/dashboard/shared/funcionario-selecao/funcionario-selecao.component';
import { Equipamento } from 'src/app/dashboard/models/equipamento';
import { Maquina } from 'src/app/dashboard/models/maquina';
import { Veiculo } from 'src/app/dashboard/models/veiculo';
import { EquipamentoService } from 'src/app/dashboard/services/equipamento.service';
import { MaquinaService } from 'src/app/dashboard/services/maquina.service';
import { VeiculoService } from 'src/app/dashboard/services/veiculo.service';
import { MaquinaSelecaoComponent } from 'src/app/dashboard/shared/maquina-selecao/maquina-selecao.component';
import { EquipamentoSelecaoComponent } from 'src/app/dashboard/shared/equipamento-selecao/equipamento-selecao.component';
import { VeiculoSelecaoComponent } from 'src/app/dashboard/shared/veiculo-selecao/veiculo-selecao.component';

@Component({
  selector: 'app-new-plantio',
  templateUrl: './new-plantio.component.html',
  styleUrls: ['./new-plantio.component.css'],
})
export class NewPlantioComponent {
  plantioFormGroup!: FormGroup;
  atividade!: Atividade;
  plantio!: Plantio;
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
    private plantioService: PlantioService,
    private statusAtividadesService: StatusAtividadeService,
    private glebaService: GlebaService,
    private funcionarioService: FuncionarioService,
    private maquinaService: MaquinaService,
    private equipamentoService: EquipamentoService,
    private veiculoService: VeiculoService,
    private router: Router,
    private formBuilder: FormBuilder,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.plantioFormGroup = this.formBuilder.group({
      tipoPlantio: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(100),
      ]),

      massaPlantio: new FormControl('', [
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
    this.getStatusAtividades();
    this.getGlebas();
  }

  get tipoPlantio() {
    return this.plantioFormGroup.get('tipoPlantio');
  }

  get massaPlantio() {
    return this.plantioFormGroup.get('massaPlantio');
  }

  get despesasExtras() {
    return this.plantioFormGroup.get('despesasExtras');
  }

  get statusAtividade() {
    return this.plantioFormGroup.get('statusAtividade');
  }

  get local() {
    return this.plantioFormGroup.get('local');
  }

  get observacoes() {
    return this.plantioFormGroup.get('observacoes');
  }

  get dataInicio() {
    return this.plantioFormGroup.get('dataInicio');
  }

  get dataFim() {
    return this.plantioFormGroup.get('dataFim');
  }

  getUser(id: number): any {
    this.glebaService.getProprietary(id).subscribe({
      next: (user) => {
        this.user = user;
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
      {id: 6, nome: 'PLANTIO'},
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
    );
  }

  createPlantio(): Plantio {
    return new Plantio(
      this.tipoPlantio!.value,
      this.atividade,
      this.massaPlantio!.value,
    );
  }

  onSubmit(): void {
    if (this.plantioFormGroup.invalid) {
      this.plantioFormGroup.markAllAsTouched();
      return;
    } else {

      this.calcularCustoPrevisto();
      this.atividade = this.createAtividade();
      this.plantio = this.createPlantio();

      this.plantioService.save(this.plantio).subscribe({
        next: () => {
          this.router.navigate(['/dashboard/atividades/plantios']);
        },

        error: (err) => {
          console.log('Error', err);
        },
      });
    }
  }
}
