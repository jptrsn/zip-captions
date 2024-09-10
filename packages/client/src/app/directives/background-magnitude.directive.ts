import { Directive, ElementRef, Inject, Input, OnChanges, SimpleChanges } from '@angular/core';

@Directive({
  selector: '[appBackgroundMagnitude]',
  standalone: true
})
export class BackgroundMagnitudeDirective implements OnChanges {
  @Input() magnitude!: number | null | undefined;
  @Input() maxValue = 35;
  @Input() lower = 'darkblue';
  @Input() upper = 'transparent';
  
  constructor(@Inject(ElementRef) private el: ElementRef) {}

  ngOnChanges(changes: SimpleChanges): void {
    const numValue: number = changes['magnitude'].currentValue;
    if (numValue || numValue === 0) {
      this._applyMagnitude(changes['magnitude'].currentValue);
    }
  }

  private _applyMagnitude(mag: number): void {
    if (mag) {
      const percent = Math.ceil((mag / this.maxValue) * 100);
      this.el.nativeElement.style['background-image'] = this._generateGradient(percent);
    } else {
      this.el.nativeElement.style['background-image'] = 'unset';
    }
  }

  private _generateGradient(percent: number): string {
    return `linear-gradient(to top, ${this.lower}, ${this.lower} ${percent - 5}%, ${this.upper} ${percent + 5}%, ${this.upper})`;
  }
}
