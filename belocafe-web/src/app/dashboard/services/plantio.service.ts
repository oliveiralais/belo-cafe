import { HttpClient } from '@angular/common/http';
import { Injectable, Inject } from '@angular/core';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Plantio } from '../models/plantio';

@Injectable({
  providedIn: 'root',
})
export class PlantioService {
  private BASE_URL = '/api/plantios';
  private ATV_BASE_URL = '/api/atividades';

  constructor(
    private httpClient: HttpClient,
    @Inject('servicesRootUrl') private servicesRootUrl: string
  ) {
    this.BASE_URL = `${servicesRootUrl}${this.BASE_URL}`;
    this.ATV_BASE_URL = `${servicesRootUrl}${this.ATV_BASE_URL}`;
  }

  save(plantio: Plantio): Observable<any> {
    return this.httpClient.post<Plantio>(
      this.ATV_BASE_URL + '/inserir-plantio',
      {
        tipoPlantio: plantio.tipoPlantio,
        atividade: plantio.atividade,
        massaPlantio: plantio.massaPlantio,
      },
      {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token'),
        },
      }
    );
  }

  update(plantio: Plantio): Observable<any> {
    return this.httpClient.patch<Plantio>(
      this.ATV_BASE_URL + '/editar-plantio',
      {
        tipoPlantio: plantio.tipoPlantio,
        atividade: plantio.atividade,
        massaPlantio: plantio.massaPlantio,
        id: plantio.id,
      },
      {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token'),
        },
      }
    );
  }

  delete(id: number): Observable<any> {
    return this.httpClient.delete<any>(`${this.ATV_BASE_URL}/excluir-plantio?id=${id}`, {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      },
    });
  }

  getById(id: number): Observable<Plantio> {
    const searchUrl = `${this.BASE_URL}/${id}?projection=atividadePlantio`;
    return this.httpClient.get<Plantio>(searchUrl, {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      },
    });
  }

  getAll(): Observable<Plantio[]> {
    const searchUrl = `${this.BASE_URL}`;
    return this.httpClient
      .get<GetResponsePlantios>(searchUrl, {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token'),
        },
      })
      .pipe(map((response) => response._embedded.plantios));
  }

  // paginação
  findAllPaginate(
    page: number,
    pageSize: number
  ): Observable<GetResponsePlantios> {
    const searchUrl = `${this.BASE_URL}?page=${page}&size=${pageSize}&projection=atividadePlantio`;
    return this.httpClient.get<GetResponsePlantios>(searchUrl, {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      },
    });
  }

  findByAtividadeUsuarioIdPaginate(
    user: number,
    page: number,
    pageSize: number
  ): Observable<GetResponsePlantios> {
    const searchUrl = `${this.BASE_URL}/search/findByAtividadeUsuarioId?user=${user}&page=${page}&size=${pageSize}&projection=atividadePlantio`;
    return this.httpClient.get<GetResponsePlantios>(searchUrl, {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      },
    });
  }
}

interface GetResponsePlantios {
  _embedded: {
    plantios: Plantio[];
  };
  page: {
    size: number;
    totalElements: number;
    totalPages: number;
    number: number;
  };
}
