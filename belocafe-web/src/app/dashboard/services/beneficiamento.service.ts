import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Beneficiamento } from '../models/beneficiamento';

@Injectable({
  providedIn: 'root'
})
export class BeneficiamentoService {
  private BASE_URL = '/api/beneficiamentos';
  private ATV_BASE_URL = '/api/atividades';

  constructor(
    private httpClient: HttpClient,
    @Inject('servicesRootUrl') private servicesRootUrl: string
  ) {
    this.BASE_URL = `${servicesRootUrl}${this.BASE_URL}`;
    this.ATV_BASE_URL = `${servicesRootUrl}${this.ATV_BASE_URL}`;
  }

  save(beneficiamento: Beneficiamento): Observable<any> {
    return this.httpClient.post<Beneficiamento>(
      this.ATV_BASE_URL + '/inserir-beneficiamento',
      {
        atividade: beneficiamento.atividade,
        tipoBeneficiamento: beneficiamento.tipoBeneficiamento,
        rendimento: beneficiamento.rendimento,
      },
      {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token'),
        },
      }
    );
  }

  update(beneficiamento: Beneficiamento): Observable<any> {
    return this.httpClient.patch<Beneficiamento>(
      this.ATV_BASE_URL + '/editar-beneficiamento',
      {
        atividade: beneficiamento.atividade,
        tipoBeneficiamento: beneficiamento.tipoBeneficiamento,
        rendimento: beneficiamento.rendimento,
        id: beneficiamento.id,
      },
      {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token'),
        },
      }
    );
  }

  delete(id: number): Observable<any> {
    return this.httpClient.delete<any>(`${this.ATV_BASE_URL}/excluir-beneficiamento?id=${id}`, {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      },
    });
  }

  getById(id: number): Observable<Beneficiamento> {
    const searchUrl = `${this.BASE_URL}/${id}?projection=atividadeBeneficiamento`;
    return this.httpClient.get<Beneficiamento>(searchUrl, {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      },
    });
  }

  getAll(): Observable<Beneficiamento[]> {
    const searchUrl = `${this.BASE_URL}`;
    return this.httpClient
      .get<GetResponseBeneficiamentos>(searchUrl, {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token'),
        },
      })
      .pipe(map((response) => response._embedded.beneficiamentos));
  }

  // paginação
  findAllPaginate(
    page: number,
    pageSize: number
  ): Observable<GetResponseBeneficiamentos> {
    const searchUrl = `${this.BASE_URL}?page=${page}&size=${pageSize}&projection=atividadeBeneficiamento`;
    return this.httpClient.get<GetResponseBeneficiamentos>(searchUrl, {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      },
    });
  }

  findByAtividadeUsuarioIdPaginate(
    user: number,
    page: number,
    pageSize: number
  ): Observable<GetResponseBeneficiamentos> {
    const searchUrl = `${this.BASE_URL}/search/findByAtividadeUsuarioId?user=${user}&page=${page}&size=${pageSize}&projection=atividadeBeneficiamento`;
    return this.httpClient.get<GetResponseBeneficiamentos>(searchUrl, {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      },
    });
  }
}

interface GetResponseBeneficiamentos {
  _embedded: {
    beneficiamentos: Beneficiamento[];
  };
  page: {
    size: number;
    totalElements: number;
    totalPages: number;
    number: number;
  };
}
