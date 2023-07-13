import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../interfaces/user';
import { environment } from 'src/environments/environment.development';
@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = environment.apiUrl;
  readonly arrayParams: (string | number)[] = ['list1', 'list2', 2];

  constructor(private http: HttpClient) { }

  getUsers(): Observable<HttpEvent<User[]>> {
    let myParams = new HttpParams({fromObject: {['list']: ['list1', 'list2']} });
    myParams = myParams.append('name', 'fus')
    return this.http.get<User[]>(`${this.apiUrl}/users`,
    { observe: 'events', reportProgress: true });
  }

  getUser(): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/users/1`);
  }

  createUser(user: User): Observable<User> {
    return this.http.post<User>(`${this.apiUrl}/users`, user);
  }

  updateUser(user: User): Observable<User> {
    return this.http.put<User>(`${this.apiUrl}/users/${user.id}`, user)
  }

  deleteUser(user: User): Observable<void> {
    let myHeader = new HttpHeaders({'myheader': ['headervalue', 'headervalue2']});
    myHeader = myHeader.set('X-POWERED-BY', 'FUSDEV');
    return this.http.delete<void>(`${this.apiUrl}/users/${user.id}`, { headers: myHeader })
  }

  upladoFile(file: FormData): Observable<HttpEvent<string>> {
    return this.http.post<any>(`http://localhost:3000/report/income/local`, file, { observe: 'events', reportProgress: true })
  }

  getTextFile(): Observable<string> {
    return this.http.get('./assets/text.txt', {responseType: 'text'});
  }
}
