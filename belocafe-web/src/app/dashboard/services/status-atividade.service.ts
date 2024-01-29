import { HttpClient } from '@angular/common/http';
import { Injectable, Inject } from '@angular/core';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { StatusAtividade } from '../models/status-atividade';

@Injectable({
  providedIn: 'root'
})
export class StatusAtividadeService {

  private BASE_URL = '/api/status-atividades';

  constructor(
    private httpClient: HttpClient,
    @Inject('servicesRootUrl') private servicesRootUrl: string
  ) {
    this.BASE_URL = `${servicesRootUrl}${this.BASE_URL}`;
  }

  getById(id: number): Observable<StatusAtividade> {
    const searchUrl = `${this.BASE_URL}/${id}`;
    return this.httpClient.get<StatusAtividade>(searchUrl, {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      },
    });
  }

  getAll(): Observable<StatusAtividade[]> {
    const searchUrl = `${this.BASE_URL}`;
    return this.httpClient
      .get<GetResponseStatusAtividade>(searchUrl, {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token'),
        },
      })
      .pipe(map((response) => response._embedded.statusAtividades));
  }

}

interface GetResponseStatusAtividade {
  _embedded: {
    statusAtividades: StatusAtividade[];
  };
  page: {
    size: number;
    totalElements: number;
    totalPages: number;
    number: number;
  };
}
