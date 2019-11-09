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
