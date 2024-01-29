import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { CompraExt } from 'src/app/dashboard/models/compraExt';
import { CompraExtService } from 'src/app/dashboard/services/compra-ext.service';
import { ConfirmDialogComponent } from 'src/app/dashboard/shared/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-list-compras',
  templateUrl: './list-compras.component.html',
  styleUrls: ['./list-compras.component.css'],
})
export class ListComprasComponent {
  displayedColumns: string[] = [
    'id',
    'titulo',
    'codigo',
    'valor',
    'razaoSocial',
    'cpfCnpj',
    'descricao',
    'data',
  ];

  dataSource!: MatTableDataSource<CompraExt>;

  @ViewChild(MatSort) sort!: MatSort;

  pageSizeOptions = [5, 10, 25, 100];
  currentPage: number = 0;
  pageSize: number = 5;
  elementNumber: number = 0;
  totalPages: number = 0;
  pageEvent!: PageEvent;

  filterValue!: string;
  tipoFiltro: string = 'todos';
  filterFieldEnabled: boolean = false;

  userId: number = +localStorage.getItem('user_id')!;

  constructor(
    private comprasService: CompraExtService,
    private router: Router,
    private confirmDialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.getAll();
  }

  getAll(): void {
    this.comprasService
      .findByUserIdPaginate(this.userId, this.currentPage, this.pageSize)
      .subscribe(this.updateTable());
  }

  updateTable() {
    return (data: any) => {
      this.dataSource = new MatTableDataSource(data._embedded.comprasExt);
      this.currentPage = data.page.number;
      this.pageSize = data.page.size;
      this.elementNumber = data.page.totalElements;
      this.totalPages = data.page.totalPages;
      this.dataSource.sort = this.sort;
    };
  }

  editItem(id: number) {
    this.router.navigate(['/dashboard/compras/update', id]);
  }

  deleteItem(id: number) {
    const dialogRef = this.confirmDialog.open(ConfirmDialogComponent, {
      data: {
        titulo: 'Confirmar Exclusão',
        mensagem: 'Deseja realmente excluir a compra selecionada?',
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.comprasService.delete(id).subscribe(() => {
          this.filterValue ? this.getByName() : this.getAll();
        });
      }
    });
  }

  getByName() {}

  getByFilter(): void {
    if (this.tipoFiltro === 'titulo') {
      this.comprasService
        .findByTituloContainingPaginate(
          this.filterValue,
          this.userId,
          this.currentPage,
          this.pageSize
        )
        .subscribe(this.updateTable());
    } else if (this.tipoFiltro === 'descricao') {
      this.comprasService
        .findByDescricaoContainingPaginate(
          this.filterValue,
          this.userId,
          this.currentPage,
          this.pageSize
        )
        .subscribe(this.updateTable());
    } else if (this.tipoFiltro === 'data') {
      this.comprasService
        .findByDataContainingPaginate(
          this.filterValue,
          this.userId,
          this.currentPage,
          this.pageSize
        )
        .subscribe(this.updateTable());
    }
  }

  onPaginateChange(event: PageEvent) {
    this.currentPage = event.pageIndex;
    this.pageSize = event.pageSize;
    this.elementNumber = event.length;

    this.filterValue ? this.getByFilter() : this.getAll();
  }

  applyFilter(event: Event) {
    this.filterValue = (event.target as HTMLInputElement).value;
    this.getByFilter();
  }
}
