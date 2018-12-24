import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from './../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  constructor(
    private http: HttpClient
  ) { }

  public get(url: string, options: {
    headers?: HttpHeaders | {
        [header: string]: string | string[];
    };
    observe?: 'body';
    params?: HttpParams | {
        [param: string]: string | string[];
    };
    reportProgress?: boolean;
    responseType?: 'json';
    withCredentials?: boolean;
  }): Observable<any> {
    return this.http.get(`${ environment.apiUrl }/${ url }`, { ...{ responseType: 'json' }, ...options });
  }

  public getResponse(url: string): Observable<any> {
    return this.http.get(
      `${ environment.apiUrl }/${ url }`,
      { observe: 'response' }
    );
  }

  public post(url: string, body: any | null, options?: {
    headers?: HttpHeaders | {
        [header: string]: string | string[];
    };
    observe?: 'body';
    params?: HttpParams | {
        [param: string]: string | string[];
    };
    reportProgress?: boolean;
    responseType?: 'json';
    withCredentials?: boolean;
  }): Observable<any> {
    return this.http.post(
      `${ environment.apiUrl }/${ url }`,
      body,
      { ...{ responseType: 'json' }, ...options }
    );
  }

  public put(url: string, body: any | null, options?: {
    headers?: HttpHeaders | {
        [header: string]: string | string[];
    };
    observe?: 'body';
    params?: HttpParams | {
        [param: string]: string | string[];
    };
    responseType?: 'json';
    reportProgress?: boolean;
    withCredentials?: boolean;
  }): Observable<any> {
    return this.http.put(
      `${ environment.apiUrl }/${ url }`,
      body,
      { ...{ responseType: 'json' }, ...options }
    );
  }
}
