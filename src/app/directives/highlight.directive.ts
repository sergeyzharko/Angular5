import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appHighlight]'
})
export class HighlightDirective {
  @Input() border: string;
  private el: HTMLElement;

  constructor(el: ElementRef) {
    this.el = el.nativeElement;
  }

  @HostListener('click') onClick() {
    this.highlight(this.border || 'thick solid red');
  }
  private highlight(border: string) {
    this.el.style.border = border;
  }
}
