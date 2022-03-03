import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpEvent, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { IRequest } from '../interface/request.interface';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  baseUrl: string = environment.baseUrl;

  reqHeader: HttpHeaders;
  constructor(
    private http: HttpClient,
  ) {
    this.reqHeader = new HttpHeaders({
      'Content-Type': 'application/json'
    });
  }

  get(request: IRequest): Observable<any> {
    let finalUrl = this.baseUrl + request.url;
    if (request.urlLivre) {
      finalUrl = request.url;
    }
    if (request.id) {
      finalUrl = finalUrl + "/" + request.id;
    }
    return this.http.get(finalUrl, {
      params: request.options
    })
      .pipe(
        map(
          this.extractData),
        catchError(this.handleError));
  }

  private extractData(res: any) {
    let body = res;
    return body || {};
  }

  handleError(errorResponse: HttpErrorResponse) {
    let errorMessage = '';
    if (errorResponse instanceof HttpErrorResponse) {
      errorMessage += ` HttpErrorResponse: ${errorResponse.error.message}`;
    }
    if (errorResponse.error instanceof ErrorEvent) {
      errorMessage += ' An error occurred:' + errorResponse.error.message;
    } else {
      errorMessage += ` Backend returned code ${errorResponse.status}, ` + `body was: ${errorResponse.error}`;
    }
    return throwError(errorResponse);
  }

}
