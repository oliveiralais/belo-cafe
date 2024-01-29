import { HttpClient } from '@angular/common/http';
import { Injectable, Inject } from '@angular/core';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { User } from '../models/user';
import { Equipamento } from '../models/equipamento';

@Injectable({
  providedIn: 'root',
})
export class EquipamentoService {
  private BASE_URL = '/api/equipamentos';
  private USER_BASE_URL = '/api/users';

  constructor(
    private httpClient: HttpClient,
    @Inject('servicesRootUrl') private servicesRootUrl: string
  ) {
    this.BASE_URL = `${servicesRootUrl}${this.BASE_URL}`;
    this.USER_BASE_URL = `${servicesRootUrl}${this.USER_BASE_URL}`;
  }

  save(equipamento: Equipamento): Observable<any> {
    return this.httpClient.post<Equipamento>(
      this.BASE_URL,
      {
        nome: equipamento!.nome,
        descricao: equipamento!.descricao,
        fabricante: equipamento!.fabricante,
        anoFabricacao: equipamento!.anoFabricacao,
        modelo: equipamento!.modelo,
        valorCompra: equipamento!.valorCompra,
        dataCompra: equipamento!.dataCompra,
        depreciacao: equipamento!.depreciacao,
        manutencao: equipamento!.manutencao,
        usuario: `${this.USER_BASE_URL}/${equipamento!.usuario.id}`,
      },
      {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token'),
        },
      }
    );
  }

  update(equipamento: Equipamento): Observable<any> {
    return this.httpClient.patch<Equipamento>(
      `${this.BASE_URL}/${equipamento!.id}`,
      {
        id: equipamento!.id,
        nome: equipamento!.nome,
        descricao: equipamento!.descricao,
        fabricante: equipamento!.fabricante,
        anoFabricacao: equipamento!.anoFabricacao,
        modelo: equipamento!.modelo,
        valorCompra: equipamento!.valorCompra,
        dataCompra: equipamento!.dataCompra,
        depreciacao: equipamento!.depreciacao,
        manutencao: equipamento!.manutencao,
        usuario: `${this.USER_BASE_URL}/${equipamento!.usuario.id}`,
      },
      {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token'),
        },
      }
    );
  }

  delete(id: number): Observable<any> {
    return this.httpClient.delete<Equipamento>(`${this.BASE_URL}/${id}`, {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      },
    });
  }

  getById(id: number): Observable<Equipamento> {
    const searchUrl = `${this.BASE_URL}/${id}?projection=userEquipamento`;
    return this.httpClient.get<Equipamento>(searchUrl, {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      },
    });
  }

  getAll(): Observable<Equipamento[]> {
    const searchUrl = `${this.BASE_URL}`;
    return this.httpClient
      .get<GetResponseEquipamentos>(searchUrl, {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token'),
        },
      })
      .pipe(map((response) => response._embedded.equipamentos));
  }

  getAllByUsuarioId(id: number): Observable<Equipamento[]> {
    const searchUrl = `${this.BASE_URL}/search/getAllByUsuarioId?id=${id}&projection=userEquipamento`;
    return this.httpClient
      .get<GetResponseEquipamentos>(searchUrl, {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token'),
        },
      })
      .pipe(map((response) => response._embedded.equipamentos));
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
  ): Observable<GetResponseEquipamentos> {
    const searchUrl = `${this.BASE_URL}?page=${page}&size=${pageSize}&projection=userEquipamento`;
    return this.httpClient.get<GetResponseEquipamentos>(searchUrl, {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      },
    });
  }

  findByIdPaginate(
    id: number,
    page: number,
    pageSize: number
  ): Observable<GetResponseEquipamentos> {
    const searchUrl = `${this.BASE_URL}/search/findById?id=${id}&page=${page}&size=${pageSize}&projection=userEquipamento`;
    return this.httpClient.get<GetResponseEquipamentos>(searchUrl, {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      },
    });
  }

  findByUsuarioIdPaginate(
    id: number,
    page: number,
    pageSize: number
  ): Observable<GetResponseEquipamentos> {
    const searchUrl = `${this.BASE_URL}/search/findByUsuarioId?id=${id}&page=${page}&size=${pageSize}&projection=userEquipamento`;
    return this.httpClient.get<GetResponseEquipamentos>(searchUrl, {
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
  ): Observable<GetResponseEquipamentos> {
    const searchUrl = `${this.BASE_URL}/search/findByNomeContainingAndUsuarioId?nome=${nome}&id=${id}&page=${page}&size=${pageSize}&projection=userEquipamento`;
    return this.httpClient.get<GetResponseEquipamentos>(searchUrl, {
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
  ): Observable<GetResponseEquipamentos> {
    const searchUrl = `${this.BASE_URL}/search/findByFabricanteContainingAndUsuarioId?fabricante=${fabricante}&id=${id}&page=${page}&size=${pageSize}&projection=userEquipamento`;
    return this.httpClient.get<GetResponseEquipamentos>(searchUrl, {
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
  ): Observable<GetResponseEquipamentos> {
    const searchUrl = `${this.BASE_URL}/search/findByModeloContainingAndUsuarioId?modelo=${modelo}&id=${id}&page=${page}&size=${pageSize}&projection=userEquipamento`;
    return this.httpClient.get<GetResponseEquipamentos>(searchUrl, {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      },
    });
  }
}

interface GetResponseEquipamentos {
  _embedded: {
    equipamentos: Equipamento[];
  };
  page: {
    size: number;
    totalElements: number;
    totalPages: number;
    number: number;
  };
}
