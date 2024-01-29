import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Maquina } from 'src/app/dashboard/models/maquina';
import { MaquinaService } from 'src/app/dashboard/services/maquina.service';
import { ConfirmDialogComponent } from 'src/app/dashboard/shared/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-list-maquinas',
  templateUrl: './list-maquinas.component.html',
  styleUrls: ['./list-maquinas.component.css'],
})
export class ListMaquinasComponent {
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
  dataSource!: MatTableDataSource<Maquina>;

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
    private maquinaService: MaquinaService,
    private router: Router,
    public confirmDialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.getAll();
  }

  getAll(): void {
    this.maquinaService
      .findByUsuarioIdPaginate(this.userId, this.currentPage, this.pageSize)
      .subscribe(this.updateTable());
  }

  getByFilter(): void {
    if (this.tipoFiltro === 'nome') {
      this.maquinaService
        .findByNomeContainingPaginate(
          this.filterValue,
          this.userId,
          this.currentPage,
          this.pageSize
        )
        .subscribe(this.updateTable());
    } else if (this.tipoFiltro === 'fabricante') {
      this.maquinaService
        .findByFabricanteContainingPaginate(
          this.filterValue,
          this.userId,
          this.currentPage,
          this.pageSize
        )
        .subscribe(this.updateTable());
    } else if (this.tipoFiltro === 'modelo') {
      this.maquinaService
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
      this.dataSource = new MatTableDataSource(data._embedded.maquinas);
      this.currentPage = data.page.number;
      this.pageSize = data.page.size;
      this.elementNumber = data.page.totalElements;
      this.totalPages = data.page.totalPages;
      this.dataSource.sort = this.sort;
    };
  }

  editItem(id: number) {
    this.router.navigate(['/dashboard/maquinas/update', id]);
  }

  deleteItem(id: number) {
    const dialogRef = this.confirmDialog.open(ConfirmDialogComponent, {
      data: {
        titulo: 'Confirmar Exclusão',
        mensagem: 'Deseja realmente excluir a máquina selecionada?',
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.maquinaService.delete(id).subscribe(() => {
          this.filterValue ? this.getByFilter() : this.getAll();
        });
      }
    });
  }
}
