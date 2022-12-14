import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'perf-app';
  showChild = true;

  toggleChild() {
    this.showChild = !this.showChild;
  }
}
