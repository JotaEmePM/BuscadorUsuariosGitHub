import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { User } from '../model/user';



@Injectable({
  providedIn: 'root'
})
export class GithubServicesService {

  baseUrl: string = 'https://api.github.com';

  constructor(private http: HttpClient) { }

  public getUsers(nombre: string, page: number): Observable<any> {

    return this.http.get(`${ this.baseUrl }/search/users?q=${nombre}&sort=followers&per_page=10&page=${page}`);
  }

  public getUser(login: string): Observable<any> {
    return this.http.get(`${ this.baseUrl }/users/${login}`);
  }

}
/*
id: number;
  avatar_url: string;
  url: string;
  html_url: string;
  repos_url: string;
 */
