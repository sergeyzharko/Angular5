import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[highlight]'
})
export class HighlightDirective {

  default = 'thick solid red';

  @Input() border: string;
  private el: HTMLElement;

  constructor(el: ElementRef) {
    this.el = el.nativeElement;
  }

  @HostListener('click') onClick() {
    this.highlight(this.border || this.default);
  }
  private highlight(border: string) {
    this.el.style.borderStyle = border;
  }
}
