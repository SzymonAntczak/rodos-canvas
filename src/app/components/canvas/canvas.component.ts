import {
  Component,
  HostListener,
  ViewChild,
  type AfterViewInit,
  type ElementRef,
} from '@angular/core';
import { Scene } from '../../utils/Scene';

@Component({
  selector: 'app-canvas',
  standalone: true,
  templateUrl: './canvas.component.html',
  styles: [
    `
      div {
        width: 100%;
        height: 100%;
      }
    `,
  ],
})
export class CanvasComponent implements AfterViewInit {
  private scene?: Scene;

  @ViewChild('container') container?: ElementRef<HTMLDivElement>;
  @ViewChild('canvas', { static: true }) canvas?: ElementRef<HTMLCanvasElement>;

  @HostListener('window:resize', ['$event'])
  onResize() {
    if (!this.scene) return;
    if (!this.container) throw new Error('Container not found');

    this.scene.updateSceneSize(this.container.nativeElement);
  }

  ngAfterViewInit() {
    if (!this.container) throw new Error('Container not found');
    if (!this.canvas) throw new Error('Canvas not found');

    this.scene = new Scene(
      this.container.nativeElement,
      this.canvas.nativeElement,
    );

    this.scene.addHelpers();
  }
}
