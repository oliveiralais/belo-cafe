import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Beneficiamento } from 'src/app/dashboard/models/beneficiamento';
import { AtividadeService } from 'src/app/dashboard/services/atividade.service';
import { BeneficiamentoService } from 'src/app/dashboard/services/beneficiamento.service';
import { ConfirmDialogComponent } from 'src/app/dashboard/shared/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-list-beneficiamentos',
  templateUrl: './list-beneficiamentos.component.html',
  styleUrls: ['./list-beneficiamentos.component.css']
})
export class ListBeneficiamentosComponent {
  // table configuration
  displayedColumns: string[] = [
    'id',
    'tipoBeneficiamento',
    'rendimento',
    'local',
    'status',
    'dataInicio',
    'dataFim',
    'actions',
  ];

  beneficiamentos: Beneficiamento[] = [];
  dataSource!: MatTableDataSource<Beneficiamento>;

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
    private beneficiamentoService: BeneficiamentoService,
    private atividadeService: AtividadeService,
    private router: Router,
    public confirmDialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.getAll();
  }

  getAll(): void {
    this.beneficiamentoService
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

      this.beneficiamentos = data._embedded.beneficiamentos;

      this.beneficiamentos.forEach((beneficiamento) => {
        this.atividadeService
          .findByIdPaginate(beneficiamento.atividade.id!, 0, 1)
          .subscribe((data) => {
            beneficiamento.atividade = data._embedded.atividades[0];
          });
      });

      this.dataSource = new MatTableDataSource(this.beneficiamentos);
      this.currentPage = data.page.number;
      this.pageSize = data.page.size;
      this.elementNumber = data.page.totalElements;
      this.totalPages = data.page.totalPages;
      this.dataSource.sort = this.sort;

    };
  }

  editItem(id: number) {
    this.router.navigate(['/dashboard/atividades/beneficiamentos/update', id]);
  }

  deleteItem(id: number) {
    const dialogRef = this.confirmDialog.open(ConfirmDialogComponent, {
      data: {
        titulo: 'Confirmar Exclusão',
        mensagem: 'Deseja realmente excluir o Beneficiamento selecionado?',
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.beneficiamentoService.delete(id).subscribe(() => {
          this.getAll();
        });
      }
    });
  }
}
