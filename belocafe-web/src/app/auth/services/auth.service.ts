import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/user';
import { SigninUser } from '../models/signin-user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor( private httpClient: HttpClient,
    @Inject("servicesRootUrl") private servicesRootUrl: string) {
  }

  private BASE_URL = this.servicesRootUrl+'/api/auth';

  signup(user: User): Observable<any> {
    return this.httpClient.post<User>(this.BASE_URL+"/signup", user);
  }

  signin(signinUser: SigninUser): Observable<any> {
    return this.httpClient.post<SigninUser>(this.BASE_URL+"/signin", signinUser);
  }

}
