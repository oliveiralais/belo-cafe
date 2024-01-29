import { HttpClient } from '@angular/common/http';
import { Injectable, Inject } from '@angular/core';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { User } from '../models/user';
import { Gleba } from '../models/gleba';

@Injectable({
  providedIn: 'root',
})
export class GlebaService {
  private BASE_URL = '/api/glebas';
  private USER_BASE_URL = '/api/users';

  constructor(
    private httpClient: HttpClient,
    @Inject('servicesRootUrl') private servicesRootUrl: string
  ) {
    this.BASE_URL = `${servicesRootUrl}${this.BASE_URL}`;
    this.USER_BASE_URL = `${servicesRootUrl}${this.USER_BASE_URL}`;
  }

  save(gleba: Gleba): Observable<any> {
    return this.httpClient.post<Gleba>(
      this.BASE_URL,
      {
        name: gleba!.name,
        area: gleba!.area,
        horizontalSpacing: gleba!.horizontalSpacing,
        verticalSpacing: gleba!.verticalSpacing,
        plants: gleba!.plants,
        variety: gleba!.variety,
        altitude: gleba!.altitude,
        proprietary: `${this.USER_BASE_URL}/${gleba!.proprietary.id}`,
      },
      {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token'),
        },
      }
    );
  }

  update(gleba: Gleba): Observable<any> {
    return this.httpClient.patch<Gleba>(
      `${this.BASE_URL}/${gleba!.id}`,
      {
        id: gleba!.id,
        name: gleba!.name,
        area: gleba!.area,
        horizontalSpacing: gleba!.horizontalSpacing,
        verticalSpacing: gleba!.verticalSpacing,
        plants: gleba!.plants,
        variety: gleba!.variety,
        altitude: gleba!.altitude,
        proprietary: `${this.USER_BASE_URL}/${gleba!.proprietary.id}`,
      },
      {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token'),
        },
      }
    );
  }

  delete(id: number): Observable<any> {
    return this.httpClient.delete<Gleba>(`${this.BASE_URL}/${id}`, {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      },
    });
  }

  getById(id: number): Observable<Gleba> {
    const searchUrl = `${this.BASE_URL}/${id}`;
    return this.httpClient.get<Gleba>(searchUrl, {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      },
    });
  }

  getAll(): Observable<Gleba[]> {
    const searchUrl = `${this.BASE_URL}`;
    return this.httpClient
      .get<GetResponseGlebas>(searchUrl, {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token'),
        },
      })
      .pipe(map((response) => response._embedded.glebas));
  }

  // métodos auxiliares
  getProprietary(id: number): Observable<User> {
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
  ): Observable<GetResponseGlebas> {
    const searchUrl = `${this.BASE_URL}?page=${page}&size=${pageSize}`;
    return this.httpClient.get<GetResponseGlebas>(searchUrl, {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      },
    });
  }

  findByIdPaginate(
    id: number,
    page: number,
    pageSize: number
  ): Observable<GetResponseGlebas> {
    const searchUrl = `${this.BASE_URL}/search/findById?id=${id}&page=${page}&size=${pageSize}`;
    return this.httpClient.get<GetResponseGlebas>(searchUrl, {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      },
    });
  }

  findByProprietaryIdPaginate(
    id: number,
    page: number,
    pageSize: number
  ): Observable<GetResponseGlebas> {
    const searchUrl = `${this.BASE_URL}/search/findByProprietaryId?id=${id}&page=${page}&size=${pageSize}`;
    return this.httpClient.get<GetResponseGlebas>(searchUrl, {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      },
    });
  }

  findByNameContainingPaginate(
    name: string,
    id: number,
    page: number,
    pageSize: number
  ): Observable<GetResponseGlebas> {
    const searchUrl = `${this.BASE_URL}/search/findByNameContainingAndProprietaryId?name=${name}&id=${id}&page=${page}&size=${pageSize}`;
    return this.httpClient.get<GetResponseGlebas>(searchUrl, {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      },
    });
  }
}

interface GetResponseGlebas {
  _embedded: {
    glebas: Gleba[];
  };
  page: {
    size: number;
    totalElements: number;
    totalPages: number;
    number: number;
  };
}
