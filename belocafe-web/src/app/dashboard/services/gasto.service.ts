import { HttpClient } from '@angular/common/http';
import { Injectable, Inject } from '@angular/core';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { User } from '../models/user';
import { Gasto } from '../models/gasto';

@Injectable({
  providedIn: 'root',
})
export class GastoService {
  private BASE_URL = '/api/gastos';
  private USER_BASE_URL = '/api/users';

  constructor(
    private httpClient: HttpClient,
    @Inject('servicesRootUrl') private servicesRootUrl: string
  ) {
    this.BASE_URL = `${servicesRootUrl}${this.BASE_URL}`;
    this.USER_BASE_URL = `${servicesRootUrl}${this.USER_BASE_URL}`;
  }

  save(gasto: Gasto): Observable<any> {
    return this.httpClient.post<Gasto>(
      this.BASE_URL,
      {
        type: gasto!.type,
        code: gasto!.code,
        description: gasto!.description,
        amount: gasto!.amount,
        issueDate: gasto!.issueDate,
        name: gasto!.name,
        cpfCnpj: gasto!.cpfCnpj,
        usuario: `${this.USER_BASE_URL}/${gasto!.usuario.id}`,
      },
      {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token'),
        },
      }
    );
  }

  update(gasto: Gasto): Observable<any> {
    return this.httpClient.patch<Gasto>(
      `${this.BASE_URL}/${gasto!.id}`,
      {
        id: gasto!.id,
        type: gasto!.type,
        code: gasto!.code,
        description: gasto!.description,
        amount: gasto!.amount,
        issueDate: gasto!.issueDate,
        name: gasto!.name,
        cpfCnpj: gasto!.cpfCnpj,
        usuario: `${this.USER_BASE_URL}/${gasto!.usuario.id}`,
      },
      {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token'),
        },
      }
    );
  }

  delete(id: number): Observable<any> {
    return this.httpClient.delete<Gasto>(`${this.BASE_URL}/${id}`, {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      },
    });
  }

  getById(id: number): Observable<Gasto> {
    const searchUrl = `${this.BASE_URL}/${id}?projection=userGasto`;
    return this.httpClient.get<Gasto>(searchUrl, {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      },
    });
  }

  getAll(): Observable<Gasto[]> {
    const searchUrl = `${this.BASE_URL}`;
    return this.httpClient
      .get<GetResponseGastos>(searchUrl, {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token'),
        },
      })
      .pipe(map((response) => response._embedded.gastos));
  }

  // métodos auxiliares
  getUsuario(id: number): Observable<User> {
    return this.httpClient.get<User>(`${this.USER_BASE_URL}/${id}`, {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      },
    });
  }

  // paginação
  findAllPaginate(
    page: number,
    pageSize: number
  ): Observable<GetResponseGastos> {
    const searchUrl = `${this.BASE_URL}?page=${page}&size=${pageSize}&projection=userGasto`;
    return this.httpClient.get<GetResponseGastos>(searchUrl, {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      },
    });
  }

  findByIdPaginate(
    id: number,
    page: number,
    pageSize: number
  ): Observable<GetResponseGastos> {
    const searchUrl = `${this.BASE_URL}/search/findById?id=${id}&page=${page}&size=${pageSize}&projection=userGasto`;
    return this.httpClient.get<GetResponseGastos>(searchUrl, {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      },
    });
  }

  findByUsuarioIdPaginate(
    id: number,
    page: number,
    pageSize: number
  ): Observable<GetResponseGastos> {
    const searchUrl = `${this.BASE_URL}/search/findByUsuarioId?id=${id}&page=${page}&size=${pageSize}&projection=userGasto`;
    return this.httpClient.get<GetResponseGastos>(searchUrl, {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      },
    });
  }

  findByCodeContainingPaginate(
    code: number,
    id: number,
    page: number,
    pageSize: number
  ): Observable<GetResponseGastos> {
    const searchUrl = `${this.BASE_URL}/search/findByCodeContainingAndUsuarioId?code=${code}&id=${id}&page=${page}&size=${pageSize}`;
    return this.httpClient.get<GetResponseGastos>(searchUrl, {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      },
    });
  }

  findByNameContainingPaginate(
    name: string,
    id: number,
    page: number,
    pageSize: number
  ): Observable<GetResponseGastos> {
    const searchUrl = `${this.BASE_URL}/search/findByNameContainingAndUsuarioId?name=${name}&id=${id}&page=${page}&size=${pageSize}`;
    return this.httpClient.get<GetResponseGastos>(searchUrl, {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      },
    });
  }
}

interface GetResponseGastos {
  _embedded: {
    gastos: Gasto[];
  };
  page: {
    size: number;
    totalElements: number;
    totalPages: number;
    number: number;
  };
}
