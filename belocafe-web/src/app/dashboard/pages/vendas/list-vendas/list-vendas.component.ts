import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Venda } from 'src/app/dashboard/models/venda';
import { VendaService } from 'src/app/dashboard/services/venda.service';

@Component({
  selector: 'app-list-vendas',
  templateUrl: './list-vendas.component.html',
  styleUrls: ['./list-vendas.component.css'],
})
export class ListVendasComponent {
  displayedColumns: string[] = ['id', 'data', 'valor', 'qtdCafe'];

  dataSource!: MatTableDataSource<Venda>;

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
    private vendasService: VendaService,
    private router: Router,
    private confirmDialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.getAll();
  }

  getAll(): void {
    this.vendasService
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

  findByUserIdPaginate() {}

  editItem(id: number) {
    this.router.navigate(['/dashboard/compras/update', id]);
  }

  deleteItem(id: number) {}

  onPaginateChange(event: PageEvent) {
    this.currentPage = event.pageIndex;
    this.pageSize = event.pageSize;
    this.elementNumber = event.length;

    this.getAll();
  }

  applyFilter(event: Event) {
    this.filterValue = (event.target as HTMLInputElement).value;
    this.getAll();
  }
}
