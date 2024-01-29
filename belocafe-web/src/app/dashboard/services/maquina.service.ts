import { HttpClient } from '@angular/common/http';
import { Injectable, Inject } from '@angular/core';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { User } from '../models/user';
import { Maquina } from '../models/maquina';

@Injectable({
  providedIn: 'root',
})
export class MaquinaService {
  private BASE_URL = '/api/maquinas';
  private USER_BASE_URL = '/api/users';

  constructor(
    private httpClient: HttpClient,
    @Inject('servicesRootUrl') private servicesRootUrl: string
  ) {
    this.BASE_URL = `${servicesRootUrl}${this.BASE_URL}`;
    this.USER_BASE_URL = `${servicesRootUrl}${this.USER_BASE_URL}`;
  }

  save(maquina: Maquina): Observable<any> {
    return this.httpClient.post<Maquina>(
      this.BASE_URL,
      {
        nome: maquina!.nome,
        descricao: maquina!.descricao,
        fabricante: maquina!.fabricante,
        anoFabricacao: maquina!.anoFabricacao,
        modelo: maquina!.modelo,
        valorCompra: maquina!.valorCompra,
        dataCompra: maquina!.dataCompra,
        depreciacao: maquina!.depreciacao,
        manutencao: maquina!.manutencao,
        usuario: `${this.USER_BASE_URL}/${maquina!.usuario.id}`,
      },
      {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token'),
        },
      }
    );
  }

  update(maquina: Maquina): Observable<any> {
    return this.httpClient.patch<Maquina>(
      `${this.BASE_URL}/${maquina!.id}`,
      {
        id: maquina!.id,
        nome: maquina!.nome,
        descricao: maquina!.descricao,
        fabricante: maquina!.fabricante,
        anoFabricacao: maquina!.anoFabricacao,
        modelo: maquina!.modelo,
        valorCompra: maquina!.valorCompra,
        dataCompra: maquina!.dataCompra,
        depreciacao: maquina!.depreciacao,
        manutencao: maquina!.manutencao,
        usuario: `${this.USER_BASE_URL}/${maquina!.usuario.id}`,
      },
      {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token'),
        },
      }
    );
  }

  delete(id: number): Observable<any> {
    return this.httpClient.delete<Maquina>(`${this.BASE_URL}/${id}`, {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      },
    });
  }

  getById(id: number): Observable<Maquina> {
    const searchUrl = `${this.BASE_URL}/${id}?projection=userMaquina`;
    return this.httpClient.get<Maquina>(searchUrl, {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      },
    });
  }

  getAll(): Observable<Maquina[]> {
    const searchUrl = `${this.BASE_URL}`;
    return this.httpClient
      .get<GetResponseMaquinas>(searchUrl, {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token'),
        },
      })
      .pipe(map((response) => response._embedded.maquinas));
  }

  getAllByUsuarioId(id: number): Observable<Maquina[]> {
    const searchUrl = `${this.BASE_URL}/search/getAllByUsuarioId?id=${id}&projection=userMaquina`;
    return this.httpClient
      .get<GetResponseMaquinas>(searchUrl, {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token'),
        },
      })
      .pipe(map((response) => response._embedded.maquinas));
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
  ): Observable<GetResponseMaquinas> {
    const searchUrl = `${this.BASE_URL}?page=${page}&size=${pageSize}&projection=userMaquina`;
    return this.httpClient.get<GetResponseMaquinas>(searchUrl, {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      },
    });
  }

  findByIdPaginate(
    id: number,
    page: number,
    pageSize: number
  ): Observable<GetResponseMaquinas> {
    const searchUrl = `${this.BASE_URL}/search/findById?id=${id}&page=${page}&size=${pageSize}&projection=userMaquina`;
    return this.httpClient.get<GetResponseMaquinas>(searchUrl, {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      },
    });
  }

  findByUsuarioIdPaginate(
    id: number,
    page: number,
    pageSize: number
  ): Observable<GetResponseMaquinas> {
    const searchUrl = `${this.BASE_URL}/search/findByUsuarioId?id=${id}&page=${page}&size=${pageSize}&projection=userMaquina`;
    return this.httpClient.get<GetResponseMaquinas>(searchUrl, {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      },
    });
  }

  findByNomeContainingPaginate(
    nome: string,
    id: number,
    page: number,
    pageSize: number
  ): Observable<GetResponseMaquinas> {
    const searchUrl = `${this.BASE_URL}/search/findByNomeContainingAndUsuarioId?nome=${nome}&id=${id}&page=${page}&size=${pageSize}&projection=userMaquina`;
    return this.httpClient.get<GetResponseMaquinas>(searchUrl, {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      },
    });
  }

  findByFabricanteContainingPaginate(
    fabricante: string,
    id: number,
    page: number,
    pageSize: number
  ): Observable<GetResponseMaquinas> {
    const searchUrl = `${this.BASE_URL}/search/findByFabricanteContainingAndUsuarioId?fabricante=${fabricante}&id=${id}&page=${page}&size=${pageSize}&projection=userMaquina`;
    return this.httpClient.get<GetResponseMaquinas>(searchUrl, {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      },
    });
  }

  findByModeloContainingPaginate(
    modelo: string,
    id: number,
    page: number,
    pageSize: number
  ): Observable<GetResponseMaquinas> {
    const searchUrl = `${this.BASE_URL}/search/findByModeloContainingAndUsuarioId?modelo=${modelo}&id=${id}&page=${page}&size=${pageSize}&projection=userMaquina`;
    return this.httpClient.get<GetResponseMaquinas>(searchUrl, {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      },
    });
  }
}

interface GetResponseMaquinas {
  _embedded: {
    maquinas: Maquina[];
  };
  page: {
    size: number;
    totalElements: number;
    totalPages: number;
    number: number;
  };
}
