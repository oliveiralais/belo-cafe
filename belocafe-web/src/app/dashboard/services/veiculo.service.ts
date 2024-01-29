import { HttpClient } from '@angular/common/http';
import { Injectable, Inject } from '@angular/core';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { User } from '../models/user';
import { Veiculo } from '../models/veiculo';

@Injectable({
  providedIn: 'root',
})
export class VeiculoService {
  private BASE_URL = '/api/veiculos';
  private USER_BASE_URL = '/api/users';

  constructor(
    private httpClient: HttpClient,
    @Inject('servicesRootUrl') private servicesRootUrl: string
  ) {
    this.BASE_URL = `${servicesRootUrl}${this.BASE_URL}`;
    this.USER_BASE_URL = `${servicesRootUrl}${this.USER_BASE_URL}`;
  }

  save(veiculo: Veiculo): Observable<any> {
    return this.httpClient.post<Veiculo>(
      this.BASE_URL,
      {
        nome: veiculo!.nome,
        identificacao: veiculo!.identificacao,
        descricao: veiculo!.descricao,
        fabricante: veiculo!.fabricante,
        anoFabricacao: veiculo!.anoFabricacao,
        modelo: veiculo!.modelo,
        valorCompra: veiculo!.valorCompra,
        dataCompra: veiculo!.dataCompra,
        depreciacao: veiculo!.depreciacao,
        manutencao: veiculo!.manutencao,
        usuario: `${this.USER_BASE_URL}/${veiculo!.usuario.id}`,
      },
      {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token'),
        },
      }
    );
  }

  update(veiculo: Veiculo): Observable<any> {
    return this.httpClient.patch<Veiculo>(
      `${this.BASE_URL}/${veiculo!.id}`,
      {
        id: veiculo!.id,
        nome: veiculo!.nome,
        identificacao: veiculo!.identificacao,
        descricao: veiculo!.descricao,
        fabricante: veiculo!.fabricante,
        anoFabricacao: veiculo!.anoFabricacao,
        modelo: veiculo!.modelo,
        valorCompra: veiculo!.valorCompra,
        dataCompra: veiculo!.dataCompra,
        depreciacao: veiculo!.depreciacao,
        manutencao: veiculo!.manutencao,
        usuario: `${this.USER_BASE_URL}/${veiculo!.usuario.id}`,
      },
      {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token'),
        },
      }
    );
  }

  delete(id: number): Observable<any> {
    return this.httpClient.delete<Veiculo>(`${this.BASE_URL}/${id}`, {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      },
    });
  }

  getById(id: number): Observable<Veiculo> {
    const searchUrl = `${this.BASE_URL}/${id}?projection=userVeiculo`;
    return this.httpClient.get<Veiculo>(searchUrl, {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      },
    });
  }

  getAll(): Observable<Veiculo[]> {
    const searchUrl = `${this.BASE_URL}`;
    return this.httpClient
      .get<GetResponseVeiculos>(searchUrl, {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token'),
        },
      })
      .pipe(map((response) => response._embedded.veiculos));
  }

  getAllByUsuarioId(id: number): Observable<Veiculo[]> {
    const searchUrl = `${this.BASE_URL}/search/getAllByUsuarioId?id=${id}&projection=userVeiculo`;
    return this.httpClient
      .get<GetResponseVeiculos>(searchUrl, {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token'),
        },
      })
      .pipe(map((response) => response._embedded.veiculos));
  }

  // métodos auxiliares
  getUsuario(id: number): Observable<User> {
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
  ): Observable<GetResponseVeiculos> {
    const searchUrl = `${this.BASE_URL}?page=${page}&size=${pageSize}&projection=userVeiculo`;
    return this.httpClient.get<GetResponseVeiculos>(searchUrl, {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      },
    });
  }

  findByIdPaginate(
    id: number,
    page: number,
    pageSize: number
  ): Observable<GetResponseVeiculos> {
    const searchUrl = `${this.BASE_URL}/search/findById?id=${id}&page=${page}&size=${pageSize}&projection=userVeiculo`;
    return this.httpClient.get<GetResponseVeiculos>(searchUrl, {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      },
    });
  }

  findByUsuarioIdPaginate(
    id: number,
    page: number,
    pageSize: number
  ): Observable<GetResponseVeiculos> {
    const searchUrl = `${this.BASE_URL}/search/findByUsuarioId?id=${id}&page=${page}&size=${pageSize}&projection=userVeiculo`;
    return this.httpClient.get<GetResponseVeiculos>(searchUrl, {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      },
    });
  }

  findByNomeContainingPaginate(
    nome: string,
    id: number,
    page: number,
    pageSize: number
  ): Observable<GetResponseVeiculos> {
    const searchUrl = `${this.BASE_URL}/search/findByNomeContainingAndUsuarioId?nome=${nome}&id=${id}&page=${page}&size=${pageSize}&projection=userVeiculo`;
    return this.httpClient.get<GetResponseVeiculos>(searchUrl, {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      },
    });
  }

  findByIdentificacaoContainingPaginate(
    identificacao: string,
    id: number,
    page: number,
    pageSize: number
  ): Observable<GetResponseVeiculos> {
    const searchUrl = `${this.BASE_URL}/search/findByIdentificacaoContainingAndUsuarioId?identificacao=${identificacao}&id=${id}&page=${page}&size=${pageSize}&projection=userVeiculo`;
    return this.httpClient.get<GetResponseVeiculos>(searchUrl, {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      },
    });
  }

  findByFabricanteContainingPaginate(
    fabricante: string,
    id: number,
    page: number,
    pageSize: number
  ): Observable<GetResponseVeiculos> {
    const searchUrl = `${this.BASE_URL}/search/findByFabricanteContainingAndUsuarioId?fabricante=${fabricante}&id=${id}&page=${page}&size=${pageSize}&projection=userVeiculo`;
    return this.httpClient.get<GetResponseVeiculos>(searchUrl, {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      },
    });
  }

  findByModeloContainingPaginate(
    modelo: string,
    id: number,
    page: number,
    pageSize: number
  ): Observable<GetResponseVeiculos> {
    const searchUrl = `${this.BASE_URL}/search/findByModeloContainingAndUsuarioId?modelo=${modelo}&id=${id}&page=${page}&size=${pageSize}&projection=userVeiculo`;
    return this.httpClient.get<GetResponseVeiculos>(searchUrl, {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      },
    });
  }
}

interface GetResponseVeiculos {
  _embedded: {
    veiculos: Veiculo[];
  };
  page: {
    size: number;
    totalElements: number;
    totalPages: number;
    number: number;
  };
}
