import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs/Observable';
import {tokenNotExpired} from 'angular2-jwt';

@Injectable()
export class AuthService {
  user: any;
  authToken: any;

  constructor(private http: HttpClient) {
  }

  public getToken(): string {
    return localStorage.getItem('id_token');
  }

  public getUserType(): string {
    const user = JSON.parse(localStorage.getItem('user'));
    return user.type;
  }

  public getUserId(): string {
    const user = JSON.parse(localStorage.getItem('user'));
    return user.id;
  }

  // this will also check if authenticated so no need to double check
  public isStudent(): boolean {
    return this.isAuthenticated() && (this.getUserType() === 'student');
  }

  public isAcademic(): boolean {
    return this.isAuthenticated() && (this.getUserType() === 'academic');
  }

  public isAdmin(): boolean {
    return this.isAuthenticated() && (this.getUserType() === 'admin');
  }

  public isAuthenticated(): boolean {
    // get the token
    const token = this.getToken();
    // return a boolean reflecting
    // whether or not the token is expired
    return tokenNotExpired(null, token);
  }

  registerUser(user): Observable<RegisterResponse> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.post('http://localhost:3000/users/register', user, {headers: headers}) as Observable<RegisterResponse>;
  }

  authenticateUser(user): Observable<AuthenticateResponse> {
    console.log(user);
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.post('http://localhost:3000/users/login', user, {headers: headers}) as Observable<AuthenticateResponse>;
  }

  storeUserData(token, user) {
    localStorage.setItem('id_token', token);
    localStorage.setItem('user', JSON.stringify(user));
    this.authToken = token;
    this.user = user;
  }

  logout() {
    this.authToken = null;
    this.user = null;
    localStorage.clear();
  }
}


interface RegisterResponse {
  success: boolean;
  msg: String;
}

interface AuthenticateResponse {
  success: boolean;
  token: String;
  user: any;
  msg: string;
}
