import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Venda } from '../models/venda';

@Injectable({
  providedIn: 'root',
})
export class VendaService {
  private BASE_URL = '/api/vendas';
  private USER_BASE_URL = '/api/users';

  constructor(
    private httpClient: HttpClient,
    @Inject('servicesRootUrl') private servicesRootUrl: string
  ) {
    this.BASE_URL = `${servicesRootUrl}${this.BASE_URL}`;
    this.USER_BASE_URL = `${servicesRootUrl}${this.USER_BASE_URL}`;
  }

  save() {}

  update() {}

  delete(id: number): Observable<any> {
    return this.httpClient.delete<Venda>(`${this.BASE_URL}/${id}`, {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      },
    });
  }

  getById() {}

  findByUserIdPaginate(
    id: number,
    page: number,
    pageSize: number
  ): Observable<GetResponseVendas> {
    const searchUrl = `${this.BASE_URL}/search/findByUsuarioId?id=${id}&page=${page}&size=${pageSize}`;

    return this.httpClient.get<GetResponseVendas>(searchUrl, {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      },
    });
  }

  findByDataContainingPaginate() {}

  findByValorContainingPaginate() {}

  findByQtdCafeContainingPaginate() {}
}

interface GetResponseVendas {
  _embedded: {
    vendas: Venda[];
  };
  page: {
    size: number;
    totalElements: number;
    totalPages: number;
    number: number;
  };
}
