import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Equipamento } from 'src/app/dashboard/models/equipamento';
import { EquipamentoService } from 'src/app/dashboard/services/equipamento.service';
import { ConfirmDialogComponent } from 'src/app/dashboard/shared/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-list-equipamentos',
  templateUrl: './list-equipamentos.component.html',
  styleUrls: ['./list-equipamentos.component.css'],
})
export class ListEquipamentosComponent {
  // table configuration
  displayedColumns: string[] = [
    'id',
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
  dataSource!: MatTableDataSource<Equipamento>;

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
  tipoFiltro: string = "todos";
  filterFieldEnabled: boolean = false;

  //current user
  userId: number = +localStorage.getItem('user_id')!;

  constructor(
    private equipamentoService: EquipamentoService,
    private router: Router,
    public confirmDialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.getAll();
  }

  getAll(): void {
    this.equipamentoService
      .findByUsuarioIdPaginate(this.userId, this.currentPage, this.pageSize)
      .subscribe(this.updateTable());
  }

  getByFilter(): void {
    if (this.tipoFiltro === 'nome') {
      this.equipamentoService
        .findByNomeContainingPaginate(
          this.filterValue,
          this.userId,
          this.currentPage,
          this.pageSize
        )
        .subscribe(this.updateTable());
    } else if (this.tipoFiltro === 'fabricante') {
      this.equipamentoService
        .findByFabricanteContainingPaginate(
          this.filterValue,
          this.userId,
          this.currentPage,
          this.pageSize
        )
        .subscribe(this.updateTable());
    } else if (this.tipoFiltro === 'modelo') {
      this.equipamentoService
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
      this.dataSource = new MatTableDataSource(data._embedded.equipamentos);
      this.currentPage = data.page.number;
      this.pageSize = data.page.size;
      this.elementNumber = data.page.totalElements;
      this.totalPages = data.page.totalPages;
      this.dataSource.sort = this.sort;
    };
  }

  editItem(id: number) {
    this.router.navigate(['/dashboard/equipamentos/update', id]);
  }

  deleteItem(id: number) {
    const dialogRef = this.confirmDialog.open(ConfirmDialogComponent, {
      data: {
        titulo: 'Confirmar Exclusão',
        mensagem: 'Deseja realmente excluir o equipamento selecionado?',
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.equipamentoService.delete(id).subscribe(() => {
          this.filterValue ? this.getByFilter() : this.getAll();
        });
      }
    });
  }
}
