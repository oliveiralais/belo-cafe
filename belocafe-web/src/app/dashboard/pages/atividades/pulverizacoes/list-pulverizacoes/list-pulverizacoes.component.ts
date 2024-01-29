import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Pulverizacao } from 'src/app/dashboard/models/pulverizacao';
import { AtividadeService } from 'src/app/dashboard/services/atividade.service';
import { PulverizacaoService } from 'src/app/dashboard/services/pulverizacao.service';
import { ConfirmDialogComponent } from 'src/app/dashboard/shared/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-list-pulverizacoes',
  templateUrl: './list-pulverizacoes.component.html',
  styleUrls: ['./list-pulverizacoes.component.css']
})
export class ListPulverizacoesComponent {
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

  pulverizacoes: Pulverizacao[] = [];
  dataSource!: MatTableDataSource<Pulverizacao>;

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
    private pulverizacaoService: PulverizacaoService,
    private atividadeService: AtividadeService,
    private router: Router,
    public confirmDialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.getAll();
  }

  getAll(): void {
    this.pulverizacaoService
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
      this.pulverizacoes = data._embedded.pulverizacoes;

      this.pulverizacoes.forEach((pulverizacoes) => {
        this.atividadeService
          .findByIdPaginate(pulverizacoes.atividade.id!, 0, 1)
          .subscribe((data) => {
            pulverizacoes.atividade = data._embedded.atividades[0];
          });
      });

      this.dataSource = new MatTableDataSource(this.pulverizacoes);
      this.currentPage = data.page.number;
      this.pageSize = data.page.size;
      this.elementNumber = data.page.totalElements;
      this.totalPages = data.page.totalPages;
      this.dataSource.sort = this.sort;
    };
  }

  editItem(id: number) {
    this.router.navigate(['/dashboard/atividades/pulverizacoes/update', id]);
  }

  deleteItem(id: number) {
    const dialogRef = this.confirmDialog.open(ConfirmDialogComponent, {
      data: {
        titulo: 'Confirmar Exclusão',
        mensagem: 'Deseja realmente excluir a Pulverização selecionada?',
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.pulverizacaoService.delete(id).subscribe(() => {
          this.getAll();
        });
      }
    });
  }
}
