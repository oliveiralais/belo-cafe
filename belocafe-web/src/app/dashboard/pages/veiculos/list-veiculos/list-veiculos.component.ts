import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Veiculo } from 'src/app/dashboard/models/veiculo';
import { VeiculoService } from 'src/app/dashboard/services/veiculo.service';
import { ConfirmDialogComponent } from 'src/app/dashboard/shared/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-list-veiculos',
  templateUrl: './list-veiculos.component.html',
  styleUrls: ['./list-veiculos.component.css'],
})
export class ListVeiculosComponent {
  // table configuration
  displayedColumns: string[] = [
    'identificacao',
    'nome',
    'fabricante',
    'anoFabricacao',
    'modelo',
    'valorCompra',
    'dataCompra',
    'depreciacao',
    'manutencao',
    'actions',
  ];
  dataSource!: MatTableDataSource<Veiculo>;

  @ViewChild(MatSort) sort!: MatSort;

  // paginator configuration
  pageSizeOptions = [5, 10, 25, 100];
  currentPage: number = 0;
  pageSize: number = 5;
  elementNumber: number = 0;
  totalPages: number = 0;
  pageEvent!: PageEvent;

  //filter configuration
  filterValue!: string;
  tipoFiltro: string = 'todos';
  filterFieldEnabled: boolean = false;

  //current user
  userId: number = +localStorage.getItem('user_id')!;

  constructor(
    private veiculoService: VeiculoService,
    private router: Router,
    public confirmDialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.getAll();
  }

  getAll(): void {
    this.veiculoService
      .findByUsuarioIdPaginate(this.userId, this.currentPage, this.pageSize)
      .subscribe(this.updateTable());
  }

  getByFilter(): void {
    if (this.tipoFiltro === 'nome') {
      this.veiculoService
        .findByNomeContainingPaginate(
          this.filterValue,
          this.userId,
          this.currentPage,
          this.pageSize
        )
        .subscribe(this.updateTable());
    } else if (this.tipoFiltro === 'identificacao') {
      this.veiculoService
        .findByIdentificacaoContainingPaginate(
          this.filterValue,
          this.userId,
          this.currentPage,
          this.pageSize
        )
        .subscribe(this.updateTable());
    } else if (this.tipoFiltro === 'fabricante') {
      this.veiculoService
        .findByFabricanteContainingPaginate(
          this.filterValue,
          this.userId,
          this.currentPage,
          this.pageSize
        )
        .subscribe(this.updateTable());
    } else if (this.tipoFiltro === 'modelo') {
      this.veiculoService
        .findByModeloContainingPaginate(
          this.filterValue,
          this.userId,
          this.currentPage,
          this.pageSize
        )
        .subscribe(this.updateTable());
    }
  }

  applyFilter(event: Event) {
    this.filterValue = (event.target as HTMLInputElement).value;
    this.getByFilter();
  }

  onPaginateChange(event: PageEvent) {
    this.currentPage = event.pageIndex;
    this.pageSize = event.pageSize;
    this.elementNumber = event.length;

    this.filterValue ? this.getByFilter() : this.getAll();
  }

  updateTable() {
    return (data: any) => {
      this.dataSource = new MatTableDataSource(data._embedded.veiculos);
      this.currentPage = data.page.number;
      this.pageSize = data.page.size;
      this.elementNumber = data.page.totalElements;
      this.totalPages = data.page.totalPages;
      this.dataSource.sort = this.sort;
    };
  }

  editItem(id: number) {
    this.router.navigate(['/dashboard/veiculos/update', id]);
  }

  deleteItem(id: number) {
    const dialogRef = this.confirmDialog.open(ConfirmDialogComponent, {
      data: {
        titulo: 'Confirmar Exclusão',
        mensagem: 'Deseja realmente excluir o veiculo selecionado?',
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.veiculoService.delete(id).subscribe(() => {
          this.filterValue ? this.getByFilter() : this.getAll();
        });
      }
    });
  }
}
