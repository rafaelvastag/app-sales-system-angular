import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Usuario } from './login/usuario';

import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiURL: string = environment.baseURL;
  tokenURL: string = environment.baseURL + environment.tokenURL;
  clientId: string = environment.clientId;
  clientSecret: string = environment.clientSecret;
  jwtHelper: JwtHelperService = new JwtHelperService();

  constructor(
    private http: HttpClient
  ) { }
  
  obterTokenLocalStorage() {
    const tokenString = localStorage.getItem('token');

    if (tokenString) {
      const token = JSON.parse(tokenString).access_token;
      return token;
    }

    return null;
  }

  encerrarSessao() {
    localStorage.removeItem('token');
  }

  getUsuarioAutenticado() {
    const token = this.obterTokenLocalStorage();

    if (token) {
      const user = this.jwtHelper.decodeToken(token).user_name;
      return user;
    }
    return null;
  }

  isAuthenticated(): boolean {
    const token = this.obterTokenLocalStorage();
    if (token) {
      const expired = this.jwtHelper.isTokenExpired(token);
      return !expired;
    }
    return false;
  }

  salvar(usuario: Usuario): Observable<any> {
    return this.http.post<any>(`${this.apiURL}/api/usuarios`, usuario);
  }

  tryLogin(username: string, password: string): Observable<any>{
    const params = new HttpParams()
                          .set('username', username)
                          .set('password', password)
                          .set('grant_type', environment.grant_type);
    
    const headers = {
      'Authorization': 'Basic ' + btoa(`${this.clientId}:${this.clientSecret}`),
      'Content-Type': 'application/x-www-form-urlencoded'
    }

    return this.http.post(this.tokenURL, params.toString() , { headers })
  }
}
