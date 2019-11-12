# ng-query-array-sample

## 概要

* Angular で HttpClient.getメソッド使用時にURLクエリパラメータを配列で渡す場合のサンプルです。
* HttpParams の生成時に `fromObject` で指定します。

## 実行環境

* Node.js - 10.x
* Yarn - 1.17.x

## 使用ライブラリ

* Angular - 8.2.x

## 動作確認

### 1. サンプルのダウンロード

```bash
git clone git@github.com:yasu-s/ng-query-array-sample.git
```

### 2. パッケージインストール  

```bash
cd ng-query-array-sample
yarn
```

### 3. サンプルの起動  

```bash
yarn start
```

## 実行結果

![get-array](https://user-images.githubusercontent.com/2668146/68537410-5c869600-03a6-11ea-8ad5-d65cf2e0355a.gif)

## サンプルソース

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
