import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-join-code',
  templateUrl: './join-code.component.html',
  styleUrls: ['./join-code.component.scss'],
})
export class JoinCodeComponent {
  @Input() joinCode?: string;
}
