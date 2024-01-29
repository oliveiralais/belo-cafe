import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Gleba } from 'src/app/dashboard/models/gleba';
import { GlebaService } from 'src/app/dashboard/services/gleba.service';
import { ConfirmDialogComponent } from 'src/app/dashboard/shared/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-list-glebas',
  templateUrl: './list-glebas.component.html',
  styleUrls: ['./list-glebas.component.css'],
})
export class ListGlebasComponent {
  // table configuration
  displayedColumns: string[] = [
    'id',
    'name',
    'area',
    'spacing',
    'plants',
    'variety',
    'altitude',
    'actions',
  ];
  dataSource!: MatTableDataSource<Gleba>;

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
    private glebaService: GlebaService,
    private router: Router,
    public confirmDialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.getAll();
  }

  getAll(): void {
    this.glebaService
      .findByProprietaryIdPaginate(this.userId, this.currentPage, this.pageSize)
      .subscribe(this.updateTable());
  }

  getByName(): void {
    this.glebaService
      .findByNameContainingPaginate(
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
      this.dataSource = new MatTableDataSource(data._embedded.glebas);
      this.currentPage = data.page.number;
      this.pageSize = data.page.size;
      this.elementNumber = data.page.totalElements;
      this.totalPages = data.page.totalPages;
      this.dataSource.sort = this.sort;
    };
  }

  editItem(id: number) {
    this.router.navigate(['/dashboard/glebas/update', id]);
  }

  deleteItem(id: number) {
    const dialogRef = this.confirmDialog.open(ConfirmDialogComponent, {
      data: {
        titulo: 'Confirmar Exclusão',
        mensagem: 'Deseja realmente excluir a Gleba selecionada?',
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.glebaService.delete(id).subscribe(() => {
          this.filterValue ? this.getByName() : this.getAll();
        });
      }
    });
  }
}
