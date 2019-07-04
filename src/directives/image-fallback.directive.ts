import {Directive, HostBinding, HostListener, Input} from '@angular/core';

@Directive({
  selector: 'img[default]'
})
export class ImageFallbackDirective {

  @HostBinding('src', ['$event.target'])
  @Input() src: string;

  @Input() default: string;

  @HostBinding('class') className;

  @HostListener('error', ['$event.target'])
  updateUrl() {
    this.src = this.default;
  }

  @HostListener('load', ['$event.target'])
  load() {
    this.className = 'image-loaded';
  }
}
