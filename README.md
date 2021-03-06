# ng-query-array-sample

## Overview

* This is a sample for passing URL query parameters as an array when using the HttpClient.get method in Angular.
* It is specified with `fromObject` when creating HttpParams.

## System requirements

* Node.js - 10.x
* Yarn - 1.17.x

## Used library

* Angular - 8.2.x

## Usage

### 1. Download Sample

```bash
git clone git@github.com:yasu-s/ng-query-array-sample.git
```

### 2. Installing packages  

```bash
cd ng-query-array-sample
yarn
```

### 3. Launch sample application  

```bash
yarn start
```

## Execution result

![get-array](https://user-images.githubusercontent.com/2668146/68537410-5c869600-03a6-11ea-8ad5-d65cf2e0355a.gif)

## Sample source

### app.service.ts

```typescript
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
```

### app.component.ts

```typescript
import { Component } from '@angular/core';

import { AppService } from './app.service';

@Component({
  selector: 'app-root',
  template: `
    <div>
      <div><input type="text" [(ngModel)]="text1" /></div>
      <div><input type="text" [(ngModel)]="text2" /></div>
      <div><input type="text" [(ngModel)]="text3" /></div>
      <button (click)="onClick()">get</button>
    </div>
  `,
})
export class AppComponent {
  text1 = 'abc';
  text2 = 'def';
  text3 = 'hoge';

  constructor(private appService: AppService) {}

  onClick(): void {
    this.appService.get(this.text1, this.text2, this.text3).subscribe();
  }
}
```

### app.module.ts

```typescript
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, HttpClientModule, FormsModule],
  bootstrap: [AppComponent],
})
export class AppModule {}
```
