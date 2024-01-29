import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Gasto } from 'src/app/dashboard/models/gasto';
import { GastoService  } from 'src/app/dashboard/services/gasto.service';
import { ConfirmDialogComponent } from 'src/app/dashboard/shared/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-list-gastos',
  templateUrl: './list-gastos.component.html',
  styleUrls: ['./list-gastos.component.css'],
})
export class ListGastosComponent {
  // table configuration
  displayedColumns: string[] = [
    'id',
    'type',
    'code',
    'description',
    'amount',
    'issueDate',
    'name',
    'cpfCnpj',
    'actions',
  ];
  dataSource!: MatTableDataSource<Gasto>;

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
    private gastoService: GastoService,
    private router: Router,
    public confirmDialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.getAll();
  }

  getAll(): void {
    this.gastoService
      .findByUsuarioIdPaginate(this.userId, this.currentPage, this.pageSize)
      .subscribe(this.updateTable());
  }

  // obs.: fazer um filtro para tipo do registro de gasto (nf, recibo, duplicata, outros...)
  getByFilter(): void {
    if (this.tipoFiltro === 'name') {
      this.gastoService
        .findByNameContainingPaginate(
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
      this.dataSource = new MatTableDataSource(data._embedded.gastos);
      this.currentPage = data.page.number;
      this.pageSize = data.page.size;
      this.elementNumber = data.page.totalElements;
      this.totalPages = data.page.totalPages;
      this.dataSource.sort = this.sort;
    };
  }

  editItem(id: number) {
    this.router.navigate(['/dashboard/gastos/update', id]);
  }

  deleteItem(id: number) {
    const dialogRef = this.confirmDialog.open(ConfirmDialogComponent, {
      data: {
        titulo: 'Confirmar Exclusão',
        mensagem: 'Deseja realmente excluir o gasto selecionado?',
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.gastoService.delete(id).subscribe(() => {
          this.filterValue ? this.getByFilter() : this.getAll();
        });
      }
    });
  }
}
