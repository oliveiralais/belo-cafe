import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Funcionario } from 'src/app/dashboard/models/funcionario';
import { FuncionarioService } from 'src/app/dashboard/services/funcionario.service';
import { ConfirmDialogComponent } from 'src/app/dashboard/shared/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-list-funcionarios',
  templateUrl: './list-funcionarios.component.html',
  styleUrls: ['./list-funcionarios.component.css'],
})
export class ListFuncionariosComponent {
  // table configuration
  displayedColumns: string[] = [
    'id',
    'nome',
    'telefone',
    'funcao',
    'salario',
    'actions',
  ];
  dataSource!: MatTableDataSource<Funcionario>;

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

  constructor(
    private funcionarioService: FuncionarioService,
    private router: Router,
    public confirmDialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.getAll();
  }

  getAll(): void {
    this.funcionarioService
      .findByUsuarioIdPaginate(this.userId, this.currentPage, this.pageSize)
      .subscribe(this.updateTable());
  }

  getByName(): void {
    this.funcionarioService
      .findByNomeContainingPaginate(
        this.filterValue,
        this.userId,
        this.currentPage,
        this.pageSize
      )
      .subscribe(this.updateTable());
  }

  applyFilter(event: Event) {
    this.filterValue = (event.target as HTMLInputElement).value;
    this.getByName();
  }

  onPaginateChange(event: PageEvent) {
    this.currentPage = event.pageIndex;
    this.pageSize = event.pageSize;
    this.elementNumber = event.length;

    this.filterValue ? this.getByName() : this.getAll();
  }

  updateTable() {
    return (data: any) => {
      this.dataSource = new MatTableDataSource(data._embedded.funcionarios);
      this.currentPage = data.page.number;
      this.pageSize = data.page.size;
      this.elementNumber = data.page.totalElements;
      this.totalPages = data.page.totalPages;
      this.dataSource.sort = this.sort;
    };
  }

  editItem(id: number) {
    this.router.navigate(['/dashboard/funcionarios/update', id]);
  }

  deleteItem(id: number) {
    const dialogRef = this.confirmDialog.open(ConfirmDialogComponent, {
      data: {
        titulo: 'Confirmar Exclusão',
        mensagem: 'Deseja realmente excluir o funcionário selecionado?',
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.funcionarioService.delete(id).subscribe(() => {
          this.filterValue ? this.getByName() : this.getAll();
        });
      }
    });
  }
}
