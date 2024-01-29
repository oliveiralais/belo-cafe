import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Irrigacao } from '../models/irrigacao';

@Injectable({
  providedIn: 'root'
})

export class IrrigacaoService {

  private BASE_URL = '/api/irrigacoes';
  private ATV_BASE_URL = '/api/atividades';

  constructor(
    private httpClient: HttpClient,
    @Inject('servicesRootUrl') private servicesRootUrl: string
  ) {
    this.BASE_URL = `${servicesRootUrl}${this.BASE_URL}`;
    this.ATV_BASE_URL = `${servicesRootUrl}${this.ATV_BASE_URL}`;
  }

  save(irrigacao: Irrigacao): Observable<any> {
    return this.httpClient.post<Irrigacao>(
      this.ATV_BASE_URL + '/inserir-irrigacao',
      {
        tipoIrrigacao: irrigacao.tipoIrrigacao,
        atividade: irrigacao.atividade,
        fertirrigacao: irrigacao.fertirrigacao,
      },
      {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token'),
        },
      }
    );
  }

  update(irrigacao: Irrigacao): Observable<any> {
    return this.httpClient.patch<Irrigacao>(
      this.ATV_BASE_URL + '/editar-irrigacao',
      {
        tipoIrrigacao: irrigacao.tipoIrrigacao,
        atividade: irrigacao.atividade,
        fertirrigacao: irrigacao.fertirrigacao,
        id: irrigacao.id,
      },
      {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token'),
        },
      }
    );
  }

  delete(id: number): Observable<any> {
    return this.httpClient.delete<any>(`${this.ATV_BASE_URL}/excluir-irrigacao?id=${id}`, {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      },
    });
  }

  getById(id: number): Observable<Irrigacao> {
    const searchUrl = `${this.BASE_URL}/${id}?projection=atividadeIrrigacao`;
    return this.httpClient.get<Irrigacao>(searchUrl, {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      },
    });
  }

  getAll(): Observable<Irrigacao[]> {
    const searchUrl = `${this.BASE_URL}`;
    return this.httpClient
      .get<GetResponseIrrigacoes>(searchUrl, {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token'),
        },
      })
      .pipe(map((response) => response._embedded.irrigacoes));
  }

  // paginação
  findAllPaginate(
    page: number,
    pageSize: number
  ): Observable<GetResponseIrrigacoes> {
    const searchUrl = `${this.BASE_URL}?page=${page}&size=${pageSize}&projection=atividadeIrrigacao`;
    return this.httpClient.get<GetResponseIrrigacoes>(searchUrl, {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      },
    });
  }

  findByAtividadeUsuarioIdPaginate(
    user: number,
    page: number,
    pageSize: number
  ): Observable<GetResponseIrrigacoes> {
    const searchUrl = `${this.BASE_URL}/search/findByAtividadeUsuarioId?user=${user}&page=${page}&size=${pageSize}&projection=atividadeIrrigacao`;
    return this.httpClient.get<GetResponseIrrigacoes>(searchUrl, {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      },
    });
  }
}

interface GetResponseIrrigacoes {
  _embedded: {
    irrigacoes: Irrigacao[];
  };
  page: {
    size: number;
    totalElements: number;
    totalPages: number;
    number: number;
  };
}
