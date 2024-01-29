import { HttpClient } from '@angular/common/http';
import { Injectable, Inject } from '@angular/core';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { User } from '../models/user';
import { Funcionario } from '../models/funcionario';

@Injectable({
  providedIn: 'root',
})
export class FuncionarioService {
  private BASE_URL = '/api/funcionarios';
  private USER_BASE_URL = '/api/users';

  constructor(
    private httpClient: HttpClient,
    @Inject('servicesRootUrl') private servicesRootUrl: string
  ) {
    this.BASE_URL = `${servicesRootUrl}${this.BASE_URL}`;
    this.USER_BASE_URL = `${servicesRootUrl}${this.USER_BASE_URL}`;
  }

  save(funcionario: Funcionario): Observable<any> {
    return this.httpClient.post<Funcionario>(
      this.BASE_URL,
      {
        nome: funcionario!.nome,
        cpf: funcionario!.cpf,
        funcao: funcionario!.funcao,
        salario: funcionario!.salario,
        telefone: funcionario!.telefone,
        usuario: `${this.USER_BASE_URL}/${funcionario!.usuario.id}`,
      },
      {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token'),
        },
      }
    );
  }

  update(funcionario: Funcionario): Observable<any> {
    return this.httpClient.patch<Funcionario>(
      `${this.BASE_URL}/${funcionario!.id}`,
      {
        id: funcionario!.id,
        nome: funcionario!.nome,
        cpf: funcionario!.cpf,
        funcao: funcionario!.funcao,
        salario: funcionario!.salario,
        telefone: funcionario!.telefone,
        usuario: `${this.USER_BASE_URL}/${funcionario!.usuario.id}`,
      },
      {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token'),
        },
      }
    );
  }

  delete(id: number): Observable<any> {
    return this.httpClient.delete<Funcionario>(`${this.BASE_URL}/${id}`, {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      },
    });
  }

  getById(id: number): Observable<Funcionario> {
    const searchUrl = `${this.BASE_URL}/${id}?projection=userFuncionario`;
    return this.httpClient.get<Funcionario>(searchUrl, {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      },
    });
  }

  getAll(): Observable<Funcionario[]> {
    const searchUrl = `${this.BASE_URL}`;
    return this.httpClient
      .get<GetResponseFuncionarios>(searchUrl, {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token'),
        },
      })
      .pipe(map((response) => response._embedded.funcionarios));
  }

  getAllByUsuarioId(id: number): Observable<Funcionario[]> {
    const searchUrl = `${this.BASE_URL}/search/getAllByUsuarioId?id=${id}&projection=userFuncionario`;
    return this.httpClient
      .get<GetResponseFuncionarios>(searchUrl, {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token'),
        },
      })
      .pipe(map((response) => response._embedded.funcionarios));
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
  ): Observable<GetResponseFuncionarios> {
    const searchUrl = `${this.BASE_URL}?page=${page}&size=${pageSize}&projection=userFuncionario`;
    return this.httpClient.get<GetResponseFuncionarios>(searchUrl, {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      },
    });
  }

  findByIdPaginate(
    id: number,
    page: number,
    pageSize: number
  ): Observable<GetResponseFuncionarios> {
    const searchUrl = `${this.BASE_URL}/search/findById?id=${id}&page=${page}&size=${pageSize}&projection=userFuncionario`;
    return this.httpClient.get<GetResponseFuncionarios>(searchUrl, {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      },
    });
  }

  findByUsuarioIdPaginate(
    id: number,
    page: number,
    pageSize: number
  ): Observable<GetResponseFuncionarios> {
    const searchUrl = `${this.BASE_URL}/search/findByUsuarioId?id=${id}&page=${page}&size=${pageSize}&projection=userFuncionario`;
    return this.httpClient.get<GetResponseFuncionarios>(searchUrl, {
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
  ): Observable<GetResponseFuncionarios> {
    const searchUrl = `${this.BASE_URL}/search/findByNomeContainingAndUsuarioId?nome=${nome}&id=${id}&page=${page}&size=${pageSize}&projection=userFuncionario`;
    return this.httpClient.get<GetResponseFuncionarios>(searchUrl, {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      },
    });
  }
}

interface GetResponseFuncionarios {
  _embedded: {
    funcionarios: Funcionario[];
  };
  page: {
    size: number;
    totalElements: number;
    totalPages: number;
    number: number;
  }
}
