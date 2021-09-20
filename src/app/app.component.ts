import { Component, OnDestroy, OnInit, Renderer2 } from '@angular/core';

import { takeUntil } from "rxjs/operators";
import { fromEvent, Subject } from "rxjs";

@Component({
  selector: 'app-root',
  template: '<router-outlet></router-outlet>'
})
export class AppComponent implements OnInit, OnDestroy {
  private unsubscribe$ = new Subject();

  constructor(
    private renderer: Renderer2,
  ) { }

  ngOnInit() {
    this.removeOutlineFromElementsWhenClicking();
  }

  private removeOutlineFromElementsWhenClicking() {
    //If Tab key is pressed, add outline to elements
    fromEvent(document, 'keydown').pipe(takeUntil(this.unsubscribe$))
      .subscribe((ev: any) => {
        if (ev.key != 'Tab') return;
        this.renderer.addClass(document.body, 'user-is-tabbing');
      });

    //If mouse is moved, remove outline from elements
    fromEvent(document, 'mousedown').pipe(takeUntil(this.unsubscribe$))
      .subscribe((ev: any) => {
        this.renderer.removeClass(document.body, 'user-is-tabbing');
      });
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
