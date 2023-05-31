import { Directive, ElementRef, Input, OnChanges, SimpleChanges } from '@angular/core';

@Directive({
  selector: '[appBackgroundMagnitude]',
  standalone: true
})
export class BackgroundMagnitudeDirective implements OnChanges {
  @Input() magnitude!: number | null | undefined;
  @Input() lower = 'darkblue';
  @Input() upper = 'transparent';
  constructor(private el: ElementRef) {}

  ngOnChanges(changes: SimpleChanges): void {
    const numValue: number = changes['magnitude'].currentValue;
    if (numValue || numValue === 0) {
      this._applyMagnitude(changes['magnitude'].currentValue);
    }
  }

  private _applyMagnitude(mag: number): void {
    if (mag) {
      this.el.nativeElement.style['background-image'] = this._generateGradient(mag);
    } else {
      this.el.nativeElement.style['background-image'] = 'unset';
    }
  }

  private _generateGradient(percent: number): string {
    return `linear-gradient(to top, ${this.lower} 0%, ${this.lower} ${percent}%, ${this.upper} ${percent}%, ${this.upper} 100%)`;
  }
}
