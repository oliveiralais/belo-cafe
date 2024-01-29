import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Plantio } from 'src/app/dashboard/models/plantio';
import { AtividadeService } from 'src/app/dashboard/services/atividade.service';
import { PlantioService } from 'src/app/dashboard/services/plantio.service';
import { ConfirmDialogComponent } from 'src/app/dashboard/shared/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-list-plantios',
  templateUrl: './list-plantios.component.html',
  styleUrls: ['./list-plantios.component.css'],
})
export class ListPlantiosComponent {
  // table configuration
  displayedColumns: string[] = [
    'id',
    'tipoPlantio',
    'massaPlantio',
    'local',
    'status',
    'dataInicio',
    'dataFim',
    'actions',
  ];

  plantios: Plantio[] = [];
  dataSource!: MatTableDataSource<Plantio>;

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
    private plantioService: PlantioService,
    private atividadeService: AtividadeService,
    private router: Router,
    public confirmDialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.getAll();
  }

  getAll(): void {
    this.plantioService
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

      this.plantios = data._embedded.plantios;

      this.plantios.forEach((plantio) => {
        this.atividadeService
          .findByIdPaginate(plantio.atividade.id!, 0, 1)
          .subscribe((data) => {
            plantio.atividade = data._embedded.atividades[0];
          });
      });

      this.dataSource = new MatTableDataSource(this.plantios);
      this.currentPage = data.page.number;
      this.pageSize = data.page.size;
      this.elementNumber = data.page.totalElements;
      this.totalPages = data.page.totalPages;
      this.dataSource.sort = this.sort;

    };
  }

  editItem(id: number) {
    this.router.navigate(['/dashboard/atividades/plantios/update', id]);
  }

  deleteItem(id: number) {
    const dialogRef = this.confirmDialog.open(ConfirmDialogComponent, {
      data: {
        titulo: 'Confirmar Exclusão',
        mensagem: 'Deseja realmente excluir o Plantio selecionado?',
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.plantioService.delete(id).subscribe(() => {
          this.getAll();
        });
      }
    });
  }
}
