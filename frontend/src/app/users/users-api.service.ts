import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import {API_URL} from '../env';
import {User} from './user.model';

@Injectable()
export class UsersApiService {

  constructor(private http: HttpClient) {
  }

  private static _handleError(err: HttpErrorResponse | any) {
    return Observable.throw(err.message || 'Error: Unable to complete request.');
  }

  // GET list of public, future events
  getUsers(): Observable<User[]> {
    return this.http
      .get<User[]>(`${API_URL}/users`)
      .catch(UsersApiService._handleError);
  }

  authenticateUser(user: User): Observable<any> {
    return this.http
      .post(`${API_URL}/authenticate`, user);
  }

  saveUser(user: User): Observable<any> {
    return this.http
      .post(`${API_URL}/register`, user);
  }
}