import { Component } from '@angular/core';

import { CanvasComponent } from './components/canvas/canvas.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CanvasComponent],
  templateUrl: './app.component.html',
  styles: [
    `
      main {
        height: calc(100vh - 2rem);
        padding: 1rem;
      }
    `,
  ],
})
export class AppComponent {}
