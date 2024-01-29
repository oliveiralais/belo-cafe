import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { State } from '../models/state';

@Injectable({
  providedIn: 'root'
})
export class StateService {
  constructor( private httpClient: HttpClient) {
  }

  private API_URL = "https://servicodados.ibge.gov.br/api/v1/localidades/estados?orderBy=nome";

  getStates(): Observable<GetResponseStates[]> {
    const search_url = this.API_URL;

    return this.httpClient.get<GetResponseStates[]>(search_url);
  }

}

interface GetResponseStates {
  states: State[];
}
