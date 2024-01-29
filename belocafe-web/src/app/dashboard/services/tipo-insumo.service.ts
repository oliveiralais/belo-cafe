import { HttpClient } from '@angular/common/http';
import { Injectable, Inject } from '@angular/core';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { TipoInsumo } from '../models/tipo-insumo';

@Injectable({
  providedIn: 'root'
})
export class TipoInsumoService {

  private BASE_URL = '/api/tipos-insumo';

  constructor(
    private httpClient: HttpClient,
    @Inject('servicesRootUrl') private servicesRootUrl: string
  ) {
    this.BASE_URL = `${servicesRootUrl}${this.BASE_URL}`;
  }

  getById(id: number): Observable<TipoInsumo> {
    const searchUrl = `${this.BASE_URL}/${id}`;
    return this.httpClient.get<TipoInsumo>(searchUrl, {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      },
    });
  }

  getAll(): Observable<TipoInsumo[]> {
    const searchUrl = `${this.BASE_URL}`;
    return this.httpClient
      .get<GetResponseTipoInsumo>(searchUrl, {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token'),
        },
      })
      .pipe(map((response) => response._embedded.tiposInsumo));
  }

}

interface GetResponseTipoInsumo {
  _embedded: {
    tiposInsumo: TipoInsumo[];
  };
  page: {
    size: number;
    totalElements: number;
    totalPages: number;
    number: number;
  };
}
