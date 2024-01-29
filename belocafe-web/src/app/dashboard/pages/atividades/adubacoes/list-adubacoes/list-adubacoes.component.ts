import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Adubacao } from 'src/app/dashboard/models/adubacao';
import { AdubacaoService } from 'src/app/dashboard/services/adubacao.service';
import { AtividadeService } from 'src/app/dashboard/services/atividade.service';
import { ConfirmDialogComponent } from 'src/app/dashboard/shared/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-list-adubacoes',
  templateUrl: './list-adubacoes.component.html',
  styleUrls: ['./list-adubacoes.component.css'],
})
export class ListAdubacoesComponent {
  // table configuration
  displayedColumns: string[] = [
    'id',
    'ocorrenciaAno',
    'insumo',
    'local',
    'status',
    'dataInicio',
    'dataFim',
    'actions',
  ];

  adubacoes: Adubacao[] = [];
  dataSource!: MatTableDataSource<Adubacao>;

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
    private adubacaoService: AdubacaoService,
    private atividadeService: AtividadeService,
    private router: Router,
    public confirmDialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.getAll();
  }

  getAll(): void {
    this.adubacaoService
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
      this.adubacoes = data._embedded.adubacoes;

      this.adubacoes.forEach((adubacoes) => {
        this.atividadeService
          .findByIdPaginate(adubacoes.atividade.id!, 0, 1)
          .subscribe((data) => {
            adubacoes.atividade = data._embedded.atividades[0];
          });
      });

      this.dataSource = new MatTableDataSource(this.adubacoes);
      this.currentPage = data.page.number;
      this.pageSize = data.page.size;
      this.elementNumber = data.page.totalElements;
      this.totalPages = data.page.totalPages;
      this.dataSource.sort = this.sort;
    };
  }

  editItem(id: number) {
    this.router.navigate(['/dashboard/atividades/adubacoes/update', id]);
  }

  deleteItem(id: number) {
    const dialogRef = this.confirmDialog.open(ConfirmDialogComponent, {
      data: {
        titulo: 'Confirmar Exclusão',
        mensagem: 'Deseja realmente excluir a Adubação selecionada?',
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.adubacaoService.delete(id).subscribe(() => {
          this.getAll();
        });
      }
    });
  }
}
