import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Colheita } from '../models/colheita';

@Injectable({
  providedIn: 'root'
})
export class ColheitaService {

  private BASE_URL = '/api/colheitas';
  private ATV_BASE_URL = '/api/atividades';

  constructor(
    private httpClient: HttpClient,
    @Inject('servicesRootUrl') private servicesRootUrl: string
  ) {
    this.BASE_URL = `${servicesRootUrl}${this.BASE_URL}`;
    this.ATV_BASE_URL = `${servicesRootUrl}${this.ATV_BASE_URL}`;
  }

  save(colheita: Colheita): Observable<any> {
    return this.httpClient.post<Colheita>(
      this.ATV_BASE_URL + '/inserir-colheita',
      {
        tipoColheita: colheita.tipoColheita,
        massaColhida: colheita.massaColhida,
        rendimento: colheita.rendimento,
        atividade: colheita.atividade,
      },
      {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token'),
        },
      }
    );
  }

  update(colheita: Colheita): Observable<any> {
    return this.httpClient.patch<Colheita>(
      this.ATV_BASE_URL + '/editar-colheita',
      {
        tipoColheita: colheita.tipoColheita,
        massaColhida: colheita.massaColhida,
        rendimento: colheita.rendimento,
        atividade: colheita.atividade,
        id: colheita.id,
      },
      {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token'),
        },
      }
    );
  }

  delete(id: number): Observable<any> {
    return this.httpClient.delete<any>(`${this.ATV_BASE_URL}/excluir-colheita?id=${id}`, {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      },
    });
  }

  getById(id: number): Observable<Colheita> {
    const searchUrl = `${this.BASE_URL}/${id}?projection=atividadeColheita`;
    return this.httpClient.get<Colheita>(searchUrl, {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      },
    });
  }

  getAll(): Observable<Colheita[]> {
    const searchUrl = `${this.BASE_URL}`;
    return this.httpClient
      .get<GetResponseColheitas>(searchUrl, {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token'),
        },
      })
      .pipe(map((response) => response._embedded.colheitas));
  }

  // paginação
  findAllPaginate(
    page: number,
    pageSize: number
  ): Observable<GetResponseColheitas> {
    const searchUrl = `${this.BASE_URL}?page=${page}&size=${pageSize}&projection=atividadeColheita`;
    return this.httpClient.get<GetResponseColheitas>(searchUrl, {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      },
    });
  }

  findByAtividadeUsuarioIdPaginate(
    user: number,
    page: number,
    pageSize: number
  ): Observable<GetResponseColheitas> {
    const searchUrl = `${this.BASE_URL}/search/findByAtividadeUsuarioId?user=${user}&page=${page}&size=${pageSize}&projection=atividadeColheita`;
    return this.httpClient.get<GetResponseColheitas>(searchUrl, {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      },
    });
  }
}

interface GetResponseColheitas {
  _embedded: {
    colheitas: Colheita[];
  };
  page: {
    size: number;
    totalElements: number;
    totalPages: number;
    number: number;
  };
}
