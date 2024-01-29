import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CompraExt } from '../models/compraExt';

@Injectable({
  providedIn: 'root',
})
export class CompraExtService {
  private BASE_URL = '/api/compras-extraordinarias';
  private USER_BASE_URL = '/api/users';

  constructor(
    private httpClient: HttpClient,
    @Inject('servicesRootUrl') private servicesRootUrl: string
  ) {
    this.BASE_URL = `${servicesRootUrl}${this.BASE_URL}`;
    this.USER_BASE_URL = `${servicesRootUrl}${this.USER_BASE_URL}`;
  }

  save(compraExt: CompraExt): Observable<any> {
    return this.httpClient.post<CompraExt>(
      this.BASE_URL,
      {
        titulo: compraExt.titulo,
        descricao: compraExt.descricao,
        data: compraExt.data,
        usuario: compraExt.usuario,
      },
      {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token'),
        },
      }
    );
  }

  update(compraExt: CompraExt): Observable<any> {
    return this.httpClient.patch<CompraExt>(
      `${this.BASE_URL}/${compraExt!.id}`,
      {
        id: compraExt!.id,
        titulo: compraExt!.titulo,
        descricao: compraExt!.descricao,
        data: compraExt!.data,
        usuario: `${this.USER_BASE_URL}/${compraExt!.usuario.id}`,
      },
      {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token'),
        },
      }
    );
  }

  delete(id: number): Observable<any> {
    return this.httpClient.delete<CompraExt>(`${this.BASE_URL}/${id}`, {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      },
    });
  }

  getById(id: number): Observable<CompraExt> {
    const searchUrl = `${this.BASE_URL}/${id}?projection=userCompraExt`;

    return this.httpClient.get<CompraExt>(searchUrl, {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      },
    });
  }

  findByUserIdPaginate(
    id: number,
    page: number,
    pageSize: number
  ): Observable<GetResponseComprasExt> {
    const searchUrl = `${this.BASE_URL}/search/findByUsuarioId?id=${id}&page=${page}&size=${pageSize}`;

    return this.httpClient.get<GetResponseComprasExt>(searchUrl, {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      },
    });
  }

  findByTituloContainingPaginate(
    titulo: string,
    id: number,
    page: number,
    pageSize: number
  ): Observable<GetResponseComprasExt> {
    const searchUrl = `${this.BASE_URL}/search/findByTituloContainingAndUsuarioId?titulo=?${titulo}&id=${id}&page=${page}&size=${pageSize}&projection=userComprasExt`;

    return this.httpClient.get<GetResponseComprasExt>(searchUrl, {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      },
    });
  }

  findByDescricaoContainingPaginate(
    descricao: string,
    id: number,
    page: number,
    pageSize: number
  ): Observable<GetResponseComprasExt> {
    const searchUrl = `${this.BASE_URL}/search/findByDescricaoContainingAndUsuarioId?descricao=?${descricao}&id=${id}&page=${page}&size=${pageSize}&projection=userComprasExt`;

    return this.httpClient.get<GetResponseComprasExt>(searchUrl, {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      },
    });
  }

  findByDataContainingPaginate(
    data: string,
    id: number,
    page: number,
    pageSize: number
  ): Observable<GetResponseComprasExt> {
    const searchUrl = `${this.BASE_URL}/search/findByDataContainingAndUsuarioId?data=?${data}&id=${id}&page=${page}&size=${pageSize}&projection=userComprasExt`;

    return this.httpClient.get<GetResponseComprasExt>(searchUrl, {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      },
    });
  }
}

interface GetResponseComprasExt {
  _embedded: {
    comprasExt: CompraExt[];
  };
  page: {
    size: number;
    totalElements: number;
    totalPages: number;
    number: number;
  };
}
