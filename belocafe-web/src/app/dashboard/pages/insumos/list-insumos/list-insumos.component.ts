import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Insumo } from 'src/app/dashboard/models/insumo';
import { TipoInsumo } from 'src/app/dashboard/models/tipo-insumo';
import { InsumoService } from 'src/app/dashboard/services/insumo.service';
import { TipoInsumoService } from 'src/app/dashboard/services/tipo-insumo.service';
import { ConfirmDialogComponent } from 'src/app/dashboard/shared/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-list-insumos',
  templateUrl: './list-insumos.component.html',
  styleUrls: ['./list-insumos.component.css'],
})
export class ListInsumosComponent {
  // table configuration
  displayedColumns: string[] = [
    'nome',
    'tipoInsumo',
    'alvo',
    'principioAtivo',
    'unidade',
    'qtde',
    'valor',
    'valorTotal',
    'actions',
  ];
  dataSource!: MatTableDataSource<Insumo>;

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

  //current user
  userId: number = +localStorage.getItem('user_id')!;

  //tipo insumo
  tipoInsumoTodos = new TipoInsumo('TODOS');
  tipoInsumo: TipoInsumo = this.tipoInsumoTodos;
  tiposInsumo!: TipoInsumo[];

  constructor(
    private insumoService: InsumoService,
    private tipoInsumoService: TipoInsumoService,
    private router: Router,
    public confirmDialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.initializeFilterSelection();
    this.getAll();
  }

  initializeFilterSelection(): void {
    this.tipoInsumoService.getAll().subscribe((data) => {
      this.tiposInsumo = data;
    });
  }

  getAll(): void {
    if (this.tipoInsumo.nome === 'TODOS') {
      this.insumoService
        .findByUsuarioIdPaginate(this.userId, this.currentPage, this.pageSize)
        .subscribe(this.updateTable());
    } else {
      this.insumoService
        .findByTipoInsumoPaginate(
          this.tipoInsumo.id!,
          this.userId,
          this.currentPage,
          this.pageSize
        )
        .subscribe(this.updateTable());
    }
  }

  getByName(): void {
    if (this.tipoInsumo.nome === 'TODOS') {
      this.insumoService
        .findByNomeContainingPaginate(
          this.filterValue,
          this.userId,
          this.currentPage,
          this.pageSize
        )
        .subscribe(this.updateTable());
    } else {
      this.insumoService
        .findByNomeContainingAndTipoInsumoPaginate(
          this.filterValue,
          this.tipoInsumo.id!,
          this.userId,
          this.currentPage,
          this.pageSize
        )
        .subscribe(this.updateTable());
    }
  }

  applyFilter(event: Event) {
    this.filterValue = (event.target as HTMLInputElement).value;
    this.getByName();
  }

  onFilterSelectionChange() {
    this.filterValue ? this.getByName() : this.getAll();
  }

  onPaginateChange(event: PageEvent) {
    this.currentPage = event.pageIndex;
    this.pageSize = event.pageSize;
    this.elementNumber = event.length;

    this.filterValue ? this.getByName() : this.getAll();
  }

  updateTable() {
    return (data: any) => {
      this.dataSource = new MatTableDataSource(data._embedded.insumos);
      this.currentPage = data.page.number;
      this.pageSize = data.page.size;
      this.elementNumber = data.page.totalElements;
      this.totalPages = data.page.totalPages;
      this.dataSource.sort = this.sort;
    };
  }

  editItem(id: number) {
    this.router.navigate(['/dashboard/insumos/update', id]);
  }

  deleteItem(id: number) {
    const dialogRef = this.confirmDialog.open(ConfirmDialogComponent, {
      data: {
        titulo: 'Confirmar Exclusão',
        mensagem: 'Deseja realmente excluir o Insumo selecionado?',
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.insumoService.delete(id).subscribe(() => {
          this.filterValue ? this.getByName() : this.getAll();
        });
      }
    });
  }
}
