import { HttpClient } from '@angular/common/http';
import { Injectable, Inject } from '@angular/core';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { User } from '../models/user';
import { Insumo } from '../models/insumo';

@Injectable({
  providedIn: 'root',
})
export class InsumoService {
  private BASE_URL = '/api/insumos';
  private TIPO_BASE_URL = '/api/tipos-insumo';
  private USER_BASE_URL = '/api/users';

  constructor(
    private httpClient: HttpClient,
    @Inject('servicesRootUrl') private servicesRootUrl: string
  ) {
    this.BASE_URL = `${servicesRootUrl}${this.BASE_URL}`;
    this.TIPO_BASE_URL = `${servicesRootUrl}${this.TIPO_BASE_URL}`;
    this.USER_BASE_URL = `${servicesRootUrl}${this.USER_BASE_URL}`;
  }

  save(insumo: Insumo): Observable<any> {
    return this.httpClient.post<Insumo>(
      this.BASE_URL,
      {
        nome: insumo!.nome,
        alvo: insumo!.alvo,
        principioAtivo: insumo!.principioAtivo,
        unidade: insumo!.unidade,
        valor: insumo!.valor,
        quantidadeAdquirida: insumo!.quantidadeAdquirida,
        quantidadeDisponivel: insumo!.quantidadeDisponivel,
        valorTotal: insumo!.valorTotal,
        tipoInsumo: `${this.TIPO_BASE_URL}/${insumo!.tipoInsumo.id}`,
        usuario: `${this.USER_BASE_URL}/${insumo!.usuario.id}`,
      },
      {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token'),
        },
      }
    );
  }

  update(insumo: Insumo): Observable<any> {
    return this.httpClient.patch<Insumo>(
      `${this.BASE_URL}/${insumo!.id}`,
      {
        id: insumo!.id,
        nome: insumo!.nome,
        alvo: insumo!.alvo,
        principioAtivo: insumo!.principioAtivo,
        unidade: insumo!.unidade,
        valor: insumo!.valor,
        quantidadeAdquirida: insumo!.quantidadeAdquirida,
        quantidadeDisponivel: insumo!.quantidadeDisponivel,
        valorTotal: insumo!.valorTotal,
        tipoInsumo: `${this.TIPO_BASE_URL}/${insumo!.tipoInsumo.id}`,
        usuario: `${this.USER_BASE_URL}/${insumo!.usuario.id}`,
      },
      {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token'),
        },
      }
    );
  }

  delete(id: number): Observable<any> {
    return this.httpClient.delete<Insumo>(`${this.BASE_URL}/${id}`, {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      },
    });
  }

  getById(id: number): Observable<Insumo> {
    const searchUrl = `${this.BASE_URL}/${id}?projection=tipoInsumo`;
    return this.httpClient.get<Insumo>(searchUrl, {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      },
    });
  }

  getAll(): Observable<Insumo[]> {
    const searchUrl = `${this.BASE_URL}`;
    return this.httpClient
      .get<GetResponseInsumos>(searchUrl, {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token'),
        },
      })
      .pipe(map((response) => response._embedded.insumos));
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
  ): Observable<GetResponseInsumos> {
    const searchUrl = `${this.BASE_URL}?page=${page}&size=${pageSize}&projection=tipoInsumo`;
    return this.httpClient.get<GetResponseInsumos>(searchUrl, {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      },
    });
  }

  findByIdPaginate(
    id: number,
    page: number,
    pageSize: number
  ): Observable<GetResponseInsumos> {
    const searchUrl = `${this.BASE_URL}/search/findById?id=${id}&page=${page}&size=${pageSize}&projection=tipoInsumo`;
    return this.httpClient.get<GetResponseInsumos>(searchUrl, {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      },
    });
  }

  findByUsuarioIdPaginate(
    id: number,
    page: number,
    pageSize: number
  ): Observable<GetResponseInsumos> {
    const searchUrl = `${this.BASE_URL}/search/findByUsuarioId?id=${id}&page=${page}&size=${pageSize}&projection=tipoInsumo`;
    return this.httpClient.get<GetResponseInsumos>(searchUrl, {
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
  ): Observable<GetResponseInsumos> {
    const searchUrl = `${this.BASE_URL}/search/findByNomeContainingAndUsuarioId?nome=${nome}&id=${id}&page=${page}&size=${pageSize}&projection=tipoInsumo`;
    return this.httpClient.get<GetResponseInsumos>(searchUrl, {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      },
    });
  }

  findByNomeContainingAndTipoInsumoPaginate(
    nome: string,
    idInsumo: number,
    idUser: number,
    page: number,
    pageSize: number
  ): Observable<GetResponseInsumos> {
    const searchUrl = `${this.BASE_URL}/search/findByNomeContainingAndTipoInsumoIdAndUsuarioId?nome=${nome}&insumo=${idInsumo}&user=${idUser}&page=${page}&size=${pageSize}&projection=tipoInsumo`;
    return this.httpClient.get<GetResponseInsumos>(searchUrl, {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      },
    });
  }

  findByTipoInsumoPaginate(
    idInsumo: number,
    idUser: number,
    page: number,
    pageSize: number
  ): Observable<GetResponseInsumos> {
    const searchUrl = `${this.BASE_URL}/search/findByTipoInsumoIdAndUsuarioId?insumo=${idInsumo}&user=${idUser}&page=${page}&size=${pageSize}&projection=tipoInsumo`;
    return this.httpClient.get<GetResponseInsumos>(searchUrl, {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      },
    });
  }
}

interface GetResponseInsumos {
  _embedded: {
    insumos: Insumo[];
  };
  page: {
    size: number;
    totalElements: number;
    totalPages: number;
    number: number;
  };
}
