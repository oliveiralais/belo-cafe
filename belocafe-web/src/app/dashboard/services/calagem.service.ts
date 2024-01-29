import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Calagem } from '../models/calagem';

@Injectable({
  providedIn: 'root'
})
export class CalagemService {

  private BASE_URL = '/api/calagens';
  private ATV_BASE_URL = '/api/atividades';

  constructor(
    private httpClient: HttpClient,
    @Inject('servicesRootUrl') private servicesRootUrl: string
  ) {
    this.BASE_URL = `${servicesRootUrl}${this.BASE_URL}`;
    this.ATV_BASE_URL = `${servicesRootUrl}${this.ATV_BASE_URL}`;
  }

  save(calagem: Calagem): Observable<any> {
    return this.httpClient.post<Calagem>(
      this.ATV_BASE_URL + '/inserir-calagem',
      {
        tipoCalcario: calagem.tipoCalcario,
        qtdeCalcario: calagem.qtdeCalcario,
        atividade: calagem.atividade,
      },
      {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token'),
        },
      }
    );
  }

  update(calagem: Calagem): Observable<any> {
    console.log(calagem);
    return this.httpClient.patch<Calagem>(

      this.ATV_BASE_URL + '/editar-calagem',
      {
        tipoCalcario: calagem.tipoCalcario,
        qtdeCalcario: calagem.qtdeCalcario,
        atividade: calagem.atividade,
        id: calagem.id,
      },
      {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token'),
        },
      }
    );
  }

  delete(id: number): Observable<any> {
    return this.httpClient.delete<any>(`${this.ATV_BASE_URL}/excluir-calagem?id=${id}`, {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      },
    });
  }

  getById(id: number): Observable<Calagem> {
    const searchUrl = `${this.BASE_URL}/${id}?projection=atividadeCalagem`;
    return this.httpClient.get<Calagem>(searchUrl, {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      },
    });
  }

  getAll(): Observable<Calagem[]> {
    const searchUrl = `${this.BASE_URL}`;
    return this.httpClient
      .get<GetResponseCalagens>(searchUrl, {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token'),
        },
      })
      .pipe(map((response) => response._embedded.calagens));
  }

  // paginação
  findAllPaginate(
    page: number,
    pageSize: number
  ): Observable<GetResponseCalagens> {
    const searchUrl = `${this.BASE_URL}?page=${page}&size=${pageSize}&projection=atividadeCalagem`;
    return this.httpClient.get<GetResponseCalagens>(searchUrl, {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      },
    });
  }

  findByAtividadeUsuarioIdPaginate(
    user: number,
    page: number,
    pageSize: number
  ): Observable<GetResponseCalagens> {
    const searchUrl = `${this.BASE_URL}/search/findByAtividadeUsuarioId?user=${user}&page=${page}&size=${pageSize}&projection=atividadeCalagem`;
    return this.httpClient.get<GetResponseCalagens>(searchUrl, {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      },
    });
  }
}

interface GetResponseCalagens {
  _embedded: {
    calagens: Calagem[];
  };
  page: {
    size: number;
    totalElements: number;
    totalPages: number;
    number: number;
  };
}
