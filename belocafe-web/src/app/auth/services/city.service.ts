import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { City } from '../models/city';

@Injectable({
  providedIn: 'root'
})
export class CityService {
  constructor( private httpClient: HttpClient) {
  }

  private API_URL = "https://servicodados.ibge.gov.br/api/v1/localidades/estados";

  getCities(state: string): Observable<GetResponseCities[]> {
    const search_url = this.API_URL + "/" + state + "/municipios";

    return this.httpClient.get<GetResponseCities[]>(search_url);
  }

}

interface GetResponseCities {
  cities: City[];
}
