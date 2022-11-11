import { Directive, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';

@Directive({
  selector: '[unsubscribe]',
  standalone: true,
})
export class UnsubscribeDirective implements OnDestroy {
  private subscriptions: Subscription[] = [];

  handleSubscription(source: Observable<any>, handler: any) {
    const sub = source.subscribe(handler);
    this.subscriptions.push(sub);
  }

  ngOnDestroy(): void {
    for (const sub of this.subscriptions) {
      sub.unsubscribe();
    }
  }
}
