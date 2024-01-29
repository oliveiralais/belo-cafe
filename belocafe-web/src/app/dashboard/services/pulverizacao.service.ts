import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Pulverizacao } from '../models/pulverizacao';

@Injectable({
  providedIn: 'root'
})
export class PulverizacaoService {
  private BASE_URL = '/api/pulverizacoes';
  private ATV_BASE_URL = '/api/atividades';

  constructor(
    private httpClient: HttpClient,
    @Inject('servicesRootUrl') private servicesRootUrl: string
  ) {
    this.BASE_URL = `${servicesRootUrl}${this.BASE_URL}`;
    this.ATV_BASE_URL = `${servicesRootUrl}${this.ATV_BASE_URL}`;
  }

  save(pulverizacao: Pulverizacao): Observable<any> {
    return this.httpClient.post<Pulverizacao>(
      this.ATV_BASE_URL + '/inserir-pulverizacao',
      {
        atividade: pulverizacao.atividade,
        ocorrenciaAno: pulverizacao.ocorrenciaAno,
      },
      {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token'),
        },
      }
    );
  }

  update(pulverizacao: Pulverizacao): Observable<any> {
    return this.httpClient.patch<Pulverizacao>(
      this.ATV_BASE_URL + '/editar-pulverizacao',
      {
        atividade: pulverizacao.atividade,
        ocorrenciaAno: pulverizacao.ocorrenciaAno,
        id: pulverizacao.id,
        diferencaQtdeInsumo: pulverizacao.diferencaQtdeInsumo
      },
      {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token'),
        },
      }
    );
  }

  delete(id: number): Observable<any> {
    return this.httpClient.delete<any>(`${this.ATV_BASE_URL}/excluir-pulverizacao?id=${id}`, {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      },
    });
  }

  getById(id: number): Observable<Pulverizacao> {
    const searchUrl = `${this.BASE_URL}/${id}?projection=atividadePulverizacao`;
    return this.httpClient.get<Pulverizacao>(searchUrl, {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      },
    });
  }

  getAll(): Observable<Pulverizacao[]> {
    const searchUrl = `${this.BASE_URL}`;
    return this.httpClient
      .get<GetResponsePulverizacoes>(searchUrl, {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token'),
        },
      })
      .pipe(map((response) => response._embedded.pulverizacoes));
  }

  // paginação
  findAllPaginate(
    page: number,
    pageSize: number
  ): Observable<GetResponsePulverizacoes> {
    const searchUrl = `${this.BASE_URL}?page=${page}&size=${pageSize}&projection=atividadePulverizacao`;
    return this.httpClient.get<GetResponsePulverizacoes>(searchUrl, {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      },
    });
  }

  findByAtividadeUsuarioIdPaginate(
    user: number,
    page: number,
    pageSize: number
  ): Observable<GetResponsePulverizacoes> {
    const searchUrl = `${this.BASE_URL}/search/findByAtividadeUsuarioId?user=${user}&page=${page}&size=${pageSize}&projection=atividadePulverizacao`;
    return this.httpClient.get<GetResponsePulverizacoes>(searchUrl, {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      },
    });
  }
}

interface GetResponsePulverizacoes {
  _embedded: {
    pulverizacoes: Pulverizacao[];
  };
  page: {
    size: number;
    totalElements: number;
    totalPages: number;
    number: number;
  };
}
