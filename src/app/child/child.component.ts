import { Component, OnInit } from '@angular/core';
import { ListenerDirective } from '../listeners.directive';
import { SharedService } from '../shared.service';
import { UnsubscribeDirective } from '../subscriptions.directive';

@Component({
  selector: 'app-child',
  templateUrl: './child.component.html',
  styleUrls: ['./child.component.scss'],
  hostDirectives: [UnsubscribeDirective, ListenerDirective],
})
export class ChildComponent implements OnInit {
  public data!: any;
  constructor(
    private sharedService: SharedService,
    private unsub: UnsubscribeDirective,
    private listener: ListenerDirective
  ) {}

  ngOnInit(): void {
    this.unsub.handleSubscription(
      this.sharedService.onSendData$,
      (data: any) => {
        console.log(data);
        this.data = data;
      }
    );
    this.sharedService.getData();
    this.listener.handleListeners(document, 'click', () => {
      console.log('click occurred');
    });
  }
}
