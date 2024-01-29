import { HttpClient } from '@angular/common/http';
import { Injectable, Inject } from '@angular/core';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { User } from '../models/user';
import { Atividade } from '../models/atividade';

@Injectable({
  providedIn: 'root',
})
export class AtividadeService {
  private BASE_URL = '/api/atividades';
  private TIPO_BASE_URL = '/api/tipos-atividade';
  private STATUS_BASE_URL = '/api/status-atividades';
  private GLEBA_BASE_URL = '/api/glebas';
  private USER_BASE_URL = '/api/users';

  constructor(
    private httpClient: HttpClient,
    @Inject('servicesRootUrl') private servicesRootUrl: string
  ) {
    this.BASE_URL = `${servicesRootUrl}${this.BASE_URL}`;
    this.TIPO_BASE_URL = `${servicesRootUrl}${this.TIPO_BASE_URL}`;
    this.STATUS_BASE_URL = `${servicesRootUrl}${this.STATUS_BASE_URL}`;
    this.GLEBA_BASE_URL = `${servicesRootUrl}${this.GLEBA_BASE_URL}`;
    this.USER_BASE_URL = `${servicesRootUrl}${this.USER_BASE_URL}`;
  }

  save(atividade: Atividade): Observable<any> {
    return this.httpClient.post<Atividade>(
      this.BASE_URL,
      {
        tipoAtividade: `${this.TIPO_BASE_URL}/${atividade!.tipoAtividade.id}`,
        local: `${this.GLEBA_BASE_URL}/${atividade!.local.id}`,
        statusAtividade: `${this.STATUS_BASE_URL}/${
          atividade!.statusAtividade.id
        }`,
        dataInicio: atividade!.dataInicio,
        usuario: `${this.USER_BASE_URL}/${atividade!.usuario.id}`,
        insumo: atividade!.insumo,
        qtdeInsumo: atividade!.qtdeInsumo,
        custoInsumos: atividade!.custoInsumos,
        custoPrevisto: atividade!.custoPrevisto,
        funcionarios: atividade!.funcionarios,
        maquinas: atividade!.maquinas,
        equipamentos: atividade!.equipamentos,
        veiculos: atividade!.veiculos,
        dataFim: atividade!.dataFim,
        observacoes: atividade!.observacoes,
      },
      {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token'),
        },
      }
    );
  }

  update(atividade: Atividade): Observable<any> {
    return this.httpClient.patch<Atividade>(
      `${this.BASE_URL}/${atividade!.id}`,
      {
        tipoAtividade: `${this.TIPO_BASE_URL}/${atividade!.tipoAtividade.id}`,
        local: `${this.GLEBA_BASE_URL}/${atividade!.local.id}`,
        statusAtividade: `${this.STATUS_BASE_URL}/${
          atividade!.statusAtividade.id
        }`,
        dataInicio: atividade!.dataInicio,
        usuario: `${this.USER_BASE_URL}/${atividade!.usuario.id}`,
        insumo: atividade!.insumo,
        qtdeInsumo: atividade!.qtdeInsumo,
        custoInsumos: atividade!.custoInsumos,
        custoPrevisto: atividade!.custoPrevisto,
        funcionarios: atividade!.funcionarios,
        maquinas: atividade!.maquinas,
        equipamentos: atividade!.equipamentos,
        veiculos: atividade!.veiculos,
        dataFim: atividade!.dataFim,
        observacoes: atividade!.observacoes,
        id: atividade!.id,
      },
      {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token'),
        },
      }
    );
  }

  delete(id: number): Observable<any> {
    return this.httpClient.delete<Atividade>(`${this.BASE_URL}/${id}`, {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      },
    });
  }

  getById(id: number): Observable<Atividade> {
    const searchUrl = `${this.BASE_URL}/${id}?projection=userAtividade`;
    return this.httpClient.get<Atividade>(searchUrl, {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      },
    });
  }

  getAll(): Observable<Atividade[]> {
    const searchUrl = `${this.BASE_URL}`;
    return this.httpClient
      .get<GetResponseAtividades>(searchUrl, {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token'),
        },
      })
      .pipe(map((response) => response._embedded.atividades));
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
  ): Observable<GetResponseAtividades> {
    const searchUrl = `${this.BASE_URL}?page=${page}&size=${pageSize}&projection=userAtividade`;
    return this.httpClient.get<GetResponseAtividades>(searchUrl, {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      },
    });
  }

  findByIdPaginate(
    id: number,
    page: number,
    pageSize: number
  ): Observable<GetResponseAtividades> {
    const searchUrl = `${this.BASE_URL}/search/findById?id=${id}&page=${page}&size=${pageSize}&projection=userAtividade`;
    return this.httpClient.get<GetResponseAtividades>(searchUrl, {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      },
    });
  }

  findByUsuarioIdPaginate(
    user: number,
    dataInicio: string,
    dataFim: string,
    page: number,
    pageSize: number
  ): Observable<GetResponseAtividades> {
    const searchUrl = `${this.BASE_URL}/search/findByUsuarioIdAndDataInicioBetweenOrderByDataInicioDesc?user=${user}&inicio=${dataInicio}&fim=${dataFim}&page=${page}&size=${pageSize}&projection=userAtividade`;
    return this.httpClient.get<GetResponseAtividades>(searchUrl, {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      },
    });
  }

  findByTipoAtividadeIdAndUsuarioIdPaginate(
    atividade: number,
    user: number,
    page: number,
    pageSize: number
  ): Observable<GetResponseAtividades> {
    const searchUrl = `${this.BASE_URL}/search/findByTipoAtividadeIdAndUsuarioId?atividade=${atividade}&user=${user}&page=${page}&size=${pageSize}&projection=userAtividade`;
    return this.httpClient.get<GetResponseAtividades>(searchUrl, {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      },
    });
  }

  findByLocalIdPaginate(
    gleba: number,
    dataInicio: string,
    dataFim: string,
    page: number,
    pageSize: number
  ): Observable<GetResponseAtividades> {
    const searchUrl = `${this.BASE_URL}/search/findByLocalIdAndDataInicioBetweenOrderByDataInicioDesc?gleba=${gleba}&inicio=${dataInicio}&fim=${dataFim}&page=${page}&size=${pageSize}&projection=userAtividade`;
    return this.httpClient.get<GetResponseAtividades>(searchUrl, {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      },
    });
  }

  findByStatusAtividadeIdAndUsuarioIdPaginate(
    status: number,
    user: number,
    page: number,
    pageSize: number
  ): Observable<GetResponseAtividades> {
    const searchUrl = `${this.BASE_URL}/search/findByStatusAtividadeIdAndUsuarioId?status=${status}&user=${user}&page=${page}&size=${pageSize}&projection=userAtividade`;
    return this.httpClient.get<GetResponseAtividades>(searchUrl, {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      },
    });
  }

  findByMaquinaId(
    maquina: number,
    dataInicio: string,
    dataFim: string,
    page: number,
    pageSize: number
  ): Observable<GetResponseAtividades> {
    const searchUrl = `${this.BASE_URL}/search/findByMaquinasIdAndDataInicioBetweenOrderByDataInicioDesc?maquina=${maquina}&inicio=${dataInicio}&fim=${dataFim}&page=${page}&size=${pageSize}&projection=userAtividade`;
    return this.httpClient.get<GetResponseAtividades>(searchUrl, {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      },
    });
  }

  findByEquipamentoId(
    equipamento: number,
    dataInicio: string,
    dataFim: string,
    page: number,
    pageSize: number
  ): Observable<GetResponseAtividades> {
    const searchUrl = `${this.BASE_URL}/search/findByEquipamentosIdAndDataInicioBetweenOrderByDataInicioDesc?equipamento=${equipamento}&inicio=${dataInicio}&fim=${dataFim}&page=${page}&size=${pageSize}&projection=userAtividade`;
    return this.httpClient.get<GetResponseAtividades>(searchUrl, {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      },
    });
  }

  findByVeiculoId(
    veiculo: number,
    dataInicio: string,
    dataFim: string,
    page: number,
    pageSize: number
  ): Observable<GetResponseAtividades> {
    const searchUrl = `${this.BASE_URL}/search/findByVeiculosIdAndDataInicioBetweenOrderByDataInicioDesc?veiculo=${veiculo}&inicio=${dataInicio}&fim=${dataFim}&page=${page}&size=${pageSize}&projection=userAtividade`;
    return this.httpClient.get<GetResponseAtividades>(searchUrl, {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      },
    });
  }

  getCustoPrevistoPorMes(
    user: number,
  ): Observable<any> {
    const searchUrl = `${this.BASE_URL}/custo-previsto-por-mes?userId=${user}`;
    return this.httpClient.get<any>(searchUrl, {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      },
    });
  }

  getAtividadesPorMes(
    user: number,
  ): Observable<any> {
    const searchUrl = `${this.BASE_URL}/atividades-por-mes?userId=${user}`;
    return this.httpClient.get<any>(searchUrl, {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      },
    });
  }

  getCustoPrevistoPorGleba(
    user: number,
  ): Observable<any> {
    const searchUrl = `${this.BASE_URL}/custo-previsto-por-gleba?userId=${user}`;
    return this.httpClient.get<any>(searchUrl, {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      },
    });
  }

}

interface GetResponseAtividades {
  _embedded: {
    atividades: Atividade[];
  };
  page: {
    size: number;
    totalElements: number;
    totalPages: number;
    number: number;
  };
}
