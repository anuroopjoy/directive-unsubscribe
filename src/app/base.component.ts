import { Component, Directive, OnDestroy, Renderer2 } from '@angular/core';
import { Observable, Subscription } from 'rxjs';

@Directive()
export abstract class BaseComponent implements OnDestroy {
  private subscriptions: Subscription[] = [];
  private listeners: (() => void)[] = [];
  constructor(private renderer: Renderer2) {}

  handleSubscription(source: Observable<any>, handler: any) {
    const sub = source.subscribe(handler);
    this.subscriptions.push(sub);
  }

  handleListeners(
    target: any,
    eventName: string,
    callback: (event: any) => boolean | void
  ) {
    this.listeners.push(this.renderer.listen(target, eventName, callback));
  }

  ngOnDestroy(): void {
    for (const sub of this.subscriptions) {
      sub.unsubscribe();
    }
    for (const handler of this.listeners) {
      handler();
    }
  }
}
