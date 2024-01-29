import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Adubacao } from '../models/adubacao';

@Injectable({
  providedIn: 'root'
})
export class AdubacaoService {
  private BASE_URL = '/api/adubacoes';
  private ATV_BASE_URL = '/api/atividades';

  constructor(
    private httpClient: HttpClient,
    @Inject('servicesRootUrl') private servicesRootUrl: string
  ) {
    this.BASE_URL = `${servicesRootUrl}${this.BASE_URL}`;
    this.ATV_BASE_URL = `${servicesRootUrl}${this.ATV_BASE_URL}`;
  }

  save(adubacao: Adubacao): Observable<any> {
    return this.httpClient.post<Adubacao>(
      this.ATV_BASE_URL + '/inserir-adubacao',
      {
        atividade: adubacao.atividade,
        ocorrenciaAno: adubacao.ocorrenciaAno,
      },
      {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token'),
        },
      }
    );
  }

  update(adubacao: Adubacao): Observable<any> {
    return this.httpClient.patch<Adubacao>(
      this.ATV_BASE_URL + '/editar-adubacao',
      {
        diferencaQtdeInsumo: adubacao.diferencaQtdeInsumo,
        atividade: adubacao.atividade,
        ocorrenciaAno: adubacao.ocorrenciaAno,
        id: adubacao.id,
      },
      {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token'),
        },
      }
    );
  }

  delete(id: number): Observable<any> {
    return this.httpClient.delete<any>(`${this.ATV_BASE_URL}/excluir-adubacao?id=${id}`, {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      },
    });
  }

  getAll(): Observable<Adubacao[]> {
    const searchUrl = `${this.BASE_URL}`;
    return this.httpClient
      .get<GetResponseAdubacoes>(searchUrl, {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token'),
        },
      })
      .pipe(map((response) => response._embedded.adubacoes));
  }

  getById(id: number): Observable<Adubacao> {
    const searchUrl = `${this.BASE_URL}/${id}?projection=atividadeAdubacao`;
    return this.httpClient.get<Adubacao>(searchUrl, {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      },
    });
  }

  findAllPaginate(
    page: number,
    pageSize: number
  ): Observable<GetResponseAdubacoes> {
    const searchUrl = `${this.BASE_URL}?page=${page}&size=${pageSize}&projection=atividadeAdubacao`;
    return this.httpClient.get<GetResponseAdubacoes>(searchUrl, {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      },
    });
  }

  findByAtividadeUsuarioIdPaginate(
    user: number,
    page: number,
    pageSize: number
  ): Observable<GetResponseAdubacoes> {
    const searchUrl = `${this.BASE_URL}/search/findByAtividadeUsuarioId?user=${user}&page=${page}&size=${pageSize}&projection=atividadeAdubacao`;
    return this.httpClient.get<GetResponseAdubacoes>(searchUrl, {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      },
    });
  }
}

interface GetResponseAdubacoes {
  _embedded: {
    adubacoes: Adubacao[];
  };
  page: {
    size: number;
    totalElements: number;
    totalPages: number;
    number: number;
  };
}
