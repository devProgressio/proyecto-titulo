import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Login } from 'src/interfaces/login';
import { handleError } from 'src/utils/utils';

const urlAuthenticate: string = environment.urlServer.concat('users/authenticate');

@Injectable({
  providedIn: 'root'
})

export class LoginService {

  constructor(private http: HttpClient) { }

  /**
   * authenticate
   */
  authenticate(body) {
    return this.http.post<Login>(urlAuthenticate, body).pipe(
      catchError(handleError)
    );
  }


}
