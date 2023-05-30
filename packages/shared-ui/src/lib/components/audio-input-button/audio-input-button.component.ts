import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges, WritableSignal, signal } from '@angular/core';
import { Observable } from 'rxjs';
@Component({
  selector: 'lib-audio-input-button',
  templateUrl: './audio-input-button.component.html',
  styleUrls: ['./audio-input-button.component.scss'],
})
export class AudioInputButtonComponent implements OnChanges {
  @Input() disabled! : Observable<boolean>;
  @Input() isActive!: Observable<boolean>
  @Input() isConnected!: Observable<boolean>;
  @Output() clicked: EventEmitter<Event> = new EventEmitter<Event>();

  public emitClick(ev: Event): void {
    this.clicked.next(ev);
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes);
  }
}
