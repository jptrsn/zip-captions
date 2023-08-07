import { Component, Input } from '@angular/core';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-broadcast-session',
  templateUrl: './broadcast-session.component.html',
  styleUrls: ['./broadcast-session.component.scss'],
})
export class BroadcastSessionComponent {
  @Input() roomId!: string;
  constructor(private store: Store) {}
  
}
