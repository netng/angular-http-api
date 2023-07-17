import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpEvent, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
import { Observable, catchError, of, retry, throwError } from 'rxjs';
import { User } from '../interfaces/user';
import { environment } from 'src/environments/environment.development';
@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = environment.apiUrl;
  readonly arrayParams: (string | number)[] = ['list1', 'list2', 2];

  constructor(private http: HttpClient) { }

  getUsers(): Observable<User[]> {
    let myParams = new HttpParams({fromObject: {['list']: ['list1', 'list2']} });
    myParams = myParams.append('name', 'fus')
    return this.http.get<User[]>(`${this.apiUrl}/users `)
      .pipe(
        catchError(this.handleError)
          //   return of([]);
          // }
      );
  }

  // getUsers(): Observable<HttpEvent<User[]>> {
  //   let myParams = new HttpParams({fromObject: {['list']: ['list1', 'list2']} });
  //   myParams = myParams.append('name', 'fus')
  //   return this.http.get<User[]>(`${this.apiUrl}/users`,
  //   { observe: 'events', reportProgress: true });
  // }

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

  // try to retrying to endpoint for specific time, for example below is 3 times call
  // getUser(): Observable<User> {
    //   return this.http.get<User>(`${this.apiUrl}/usersffdafda/1`)
    //     .pipe(
      //       retry(3)
      //     );
      // }


  handleError(error: HttpErrorResponse): Observable<never> {
    if(error.status === 404) return throwError(() => ({status: 404, message: 'not found'}));
    return throwError(() => error);
  }
}
