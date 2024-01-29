import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Atividade } from 'src/app/dashboard/models/atividade';
import { Veiculo } from 'src/app/dashboard/models/veiculo';
import { AtividadeService } from 'src/app/dashboard/services/atividade.service';
import { VeiculoService } from 'src/app/dashboard/services/veiculo.service';

@Component({
  selector: 'app-atividades-veiculos',
  templateUrl: './atividades-veiculos.component.html',
  styleUrls: ['./atividades-veiculos.component.css'],
})
export class AtividadesVeiculosComponent {
  // table configuration
  displayedColumns: string[] = [
    'id',
    'local',
    'tipo',
    'status',
    'dataInicio',
    'dataFim',
    'custoInsumos',
    'custoEquipamentos',
    'custoFuncionarios',
    'custoMaquinas',
    'custoVeiculos',
    'despesasExtras',
    'custoPrevisto',
  ];
  dataSource!: MatTableDataSource<Atividade>;

  @ViewChild(MatSort) sort!: MatSort;

  // paginator configuration
  pageSizeOptions = [5, 10, 25, 100];
  currentPage: number = 0;
  pageSize: number = 5;
  elementNumber: number = 0;
  totalPages: number = 0;
  pageEvent!: PageEvent;

  //filter configuration
  veiculos: Veiculo[] = [];
  veiculo: number = 0;
  dataInicio: string = '2023-01-01';
  dataFim: string = '2023-12-31';

  //current user
  userId: number = +localStorage.getItem('user_id')!;

  constructor(
    private atividadeService: AtividadeService,
    private veiculoService: VeiculoService,
    public confirmDialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.getFilterOptions();
    this.getAll();
  }

  getFilterOptions(): void {
    this.veiculoService.getAll().subscribe((data) => {
      this.veiculos = data;
    });
  }

  getAll(): void {
    this.atividadeService
      .findByUsuarioIdPaginate(
        this.userId,
        this.dataInicio,
        this.dataFim,
        this.currentPage,
        this.pageSize
      )
      .subscribe(this.updateTable());
  }

  getByFilter(): void {
    this.atividadeService
      .findByVeiculoId(
        this.veiculo,
        this.dataInicio,
        this.dataFim,
        this.currentPage,
        this.pageSize
      )
      .subscribe(this.updateTable());
  }

  applyFilter() {
    if (this.veiculo === 0) {
      this.getAll();
    } else {
      this.getByFilter();
    }
  }

  onPaginateChange(event: PageEvent) {
    this.currentPage = event.pageIndex;
    this.pageSize = event.pageSize;
    this.elementNumber = event.length;

    this.veiculo !== 0 ? this.getByFilter() : this.getAll();
  }

  updateTable() {
    return (data: any) => {
      this.dataSource = new MatTableDataSource(data._embedded.atividades);
      this.currentPage = data.page.number;
      this.pageSize = data.page.size;
      this.elementNumber = data.page.totalElements;
      this.totalPages = data.page.totalPages;
      this.dataSource.sort = this.sort;
    };
  }
}
