import { Directive, OnDestroy, Renderer2 } from '@angular/core';
import { Observable, Subscription } from 'rxjs';

@Directive({
  selector: '[listener]',
  standalone: true,
})
export class ListenerDirective implements OnDestroy {
  private listeners: (() => void)[] = [];
  constructor(private renderer: Renderer2) {}
  handleListeners(
    target: any,
    eventName: string,
    callback: (event: any) => boolean | void
  ) {
    this.listeners.push(this.renderer.listen(target, eventName, callback));
  }

  ngOnDestroy(): void {
    for (const handler of this.listeners) {
      handler();
    }
  }
}
