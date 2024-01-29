import { HttpClient } from '@angular/common/http';
import { Injectable, Inject } from '@angular/core';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { TipoAtividade } from '../models/tipo-atividade';

@Injectable({
  providedIn: 'root'
})
export class TipoAtividadeService {

  private BASE_URL = '/api/tipos-atividade';

  constructor(
    private httpClient: HttpClient,
    @Inject('servicesRootUrl') private servicesRootUrl: string
  ) {
    this.BASE_URL = `${servicesRootUrl}${this.BASE_URL}`;
  }

  getById(id: number): Observable<TipoAtividade> {
    const searchUrl = `${this.BASE_URL}/${id}`;
    return this.httpClient.get<TipoAtividade>(searchUrl, {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      },
    });
  }

  getAll(): Observable<TipoAtividade[]> {
    const searchUrl = `${this.BASE_URL}`;
    return this.httpClient
      .get<GetResponseTipoAtividade>(searchUrl, {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token'),
        },
      })
      .pipe(map((response) => response._embedded.tiposAtividade));
  }

}

interface GetResponseTipoAtividade {
  _embedded: {
    tiposAtividade: TipoAtividade[];
  };
  page: {
    size: number;
    totalElements: number;
    totalPages: number;
    number: number;
  };
}
