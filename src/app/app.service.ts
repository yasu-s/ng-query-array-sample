import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AppService {
  constructor(private http: HttpClient) {}

  get(...params: string[]): Observable<any> {
    const url = `./assets/empty.json`;
    const httpParams = new HttpParams({ fromObject: { p: params.filter((param) => param) } });
    return this.http.get(url, { params: httpParams, observe: 'response' }).pipe(
      tap((res) => {
        console.log(`url: ${res.url}`);
      }),
    );
  }
}
