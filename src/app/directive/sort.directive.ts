import {Directive, ElementRef, HostBinding, HostListener, inject, Inject, InjectionToken, Input} from '@angular/core';
import {Sort} from '../util/sort';
import {DOCUMENT} from '@angular/common';

export const WINDOW = new InjectionToken<Window>('DOCUMENT ref', {
  factory: () => {
    const {defaultView} = inject(DOCUMENT);

    if (!defaultView) {
      throw new Error('Window is not available');
    }
    return defaultView;
  }
});


@Directive({
  selector: '[appSort]'
})
export class SortDirective {

  @Input() appSort: Array<any>;

  constructor(private targetElem: ElementRef, @Inject(WINDOW) private windowRef: Window) {
  }

  @HostListener('click')
  sortData() {
    const sort = new Sort();
    const elem = this.targetElem.nativeElement;
    const order = elem.getAttribute('data-order');
    const type = elem.getAttribute('data-type');
    const property = elem.getAttribute('data-name');

    const {document} = this.windowRef;
    const elements = document.querySelectorAll('th span');

    if (elements) {
      elements.forEach((element: HTMLElement) => {
        if (!(element.getAttribute('data-name') === property)) {
          element.classList.remove('active');
        } else {
          element.classList.add('active');
        }
      });
    }

    if (order === 'desc') {
      this.appSort.sort(sort.startSort(property, order, type));
      elem.setAttribute('data-order', 'asc');
    } else {
      this.appSort.sort(sort.startSort(property, order, type));
      elem.setAttribute('data-order', 'desc');
    }

  }
}
