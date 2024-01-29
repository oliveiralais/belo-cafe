import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Irrigacao } from 'src/app/dashboard/models/irrigacao';
import { AtividadeService } from 'src/app/dashboard/services/atividade.service';
import { IrrigacaoService } from 'src/app/dashboard/services/irrigacao.service';
import { ConfirmDialogComponent } from 'src/app/dashboard/shared/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-list-irrigacoes',
  templateUrl: './list-irrigacoes.component.html',
  styleUrls: ['./list-irrigacoes.component.css']
})
export class ListIrrigacoesComponent {
 // table configuration
 displayedColumns: string[] = [
  'id',
  'tipoIrrigacao',
  'fertirrigacao',
  'local',
  'status',
  'dataInicio',
  'dataFim',
  'actions',
];

irrigacoes: Irrigacao[] = [];
dataSource!: MatTableDataSource<Irrigacao>;

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
  private irrigacaoService: IrrigacaoService,
  private atividadeService: AtividadeService,
  private router: Router,
  public confirmDialog: MatDialog
) {}

ngOnInit(): void {
  this.getAll();
}

getAll(): void {
  this.irrigacaoService
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

    this.irrigacoes = data._embedded.irrigacoes;

    this.irrigacoes.forEach((irrigacao) => {
      this.atividadeService
        .findByIdPaginate(irrigacao.atividade.id!, 0, 1)
        .subscribe((data) => {
          irrigacao.atividade = data._embedded.atividades[0];
        });
    });

    this.dataSource = new MatTableDataSource(this.irrigacoes);
    this.currentPage = data.page.number;
    this.pageSize = data.page.size;
    this.elementNumber = data.page.totalElements;
    this.totalPages = data.page.totalPages;
    this.dataSource.sort = this.sort;

  };
}

editItem(id: number) {
  this.router.navigate(['/dashboard/atividades/irrigacoes/update', id]);
}

deleteItem(id: number) {
  const dialogRef = this.confirmDialog.open(ConfirmDialogComponent, {
    data: {
      titulo: 'Confirmar Exclusão',
      mensagem: 'Deseja realmente excluir a Irrigação selecionada?',
    },
  });

  dialogRef.afterClosed().subscribe((result) => {
    if (result) {
      this.irrigacaoService.delete(id).subscribe(() => {
        this.getAll();
      });
    }
  });
}
}
