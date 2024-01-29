import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Colheita } from 'src/app/dashboard/models/colheita';
import { AtividadeService } from 'src/app/dashboard/services/atividade.service';
import { ColheitaService } from 'src/app/dashboard/services/colheita.service';
import { ConfirmDialogComponent } from 'src/app/dashboard/shared/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-list-colheitas',
  templateUrl: './list-colheitas.component.html',
  styleUrls: ['./list-colheitas.component.css'],
})
export class ListColheitasComponent {
  // table configuration
  displayedColumns: string[] = [
    'id',
    'tipoColheita',
    'massaColhida',
    'rendimento',
    'local',
    'status',
    'dataInicio',
    'dataFim',
    'actions',
  ];

  colheitas: Colheita[] = [];
  dataSource!: MatTableDataSource<Colheita>;

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
    private colheitaService: ColheitaService,
    private atividadeService: AtividadeService,
    private router: Router,
    public confirmDialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.getAll();
  }

  getAll(): void {
    this.colheitaService
      .findByAtividadeUsuarioIdPaginate(
        this.userId,
        this.currentPage,
        this.pageSize
      )
      .subscribe(this.updateTable());
  }

  onPaginateChange(event: PageEvent) {
    this.currentPage = event.pageIndex;
    this.pageSize = event.pageSize;
    this.elementNumber = event.length;

    this.getAll();
  }

  updateTable() {
    return (data: any) => {
      this.colheitas = data._embedded.colheitas;

      this.colheitas.forEach((colheita) => {
        this.atividadeService
          .findByIdPaginate(colheita.atividade.id!, 0, 1)
          .subscribe((data) => {
            colheita.atividade = data._embedded.atividades[0];
          });
      });

      this.dataSource = new MatTableDataSource(this.colheitas);
      this.currentPage = data.page.number;
      this.pageSize = data.page.size;
      this.elementNumber = data.page.totalElements;
      this.totalPages = data.page.totalPages;
      this.dataSource.sort = this.sort;
    };
  }

  editItem(id: number) {
    this.router.navigate(['/dashboard/atividades/colheitas/update', id]);
  }

  deleteItem(id: number) {
    const dialogRef = this.confirmDialog.open(ConfirmDialogComponent, {
      data: {
        titulo: 'Confirmar Exclusão',
        mensagem: 'Deseja realmente excluir a Colheita selecionada?',
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.colheitaService.delete(id).subscribe(() => {
          this.getAll();
        });
      }
    });
  }
}
