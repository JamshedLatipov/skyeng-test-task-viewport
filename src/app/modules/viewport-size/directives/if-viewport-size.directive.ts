import {
  Directive,
  Input,
  OnDestroy,
  OnInit,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { ViewportSizeService } from '../services/viewport-size.service';

export type Sizes = 'small' | 'large' | 'medium';

@Directive({
  selector: '[ifViewportSize]',
})
export class IfViewportSizeDirective<T = unknown> implements OnDestroy, OnInit {
  private _size: Sizes;

  @Input()
  public set ifViewportSize(size: Sizes) {
    this._size = size;
  }

  private _subscription: Subscription;

  constructor(
    private _viewport: ViewportSizeService,
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef,
  ) {}

  public ngOnInit(): void {
    const initialSize = this._viewport.getInitialSize();
    this._changeViewportSize(initialSize);

    this._subscription = this._viewport.change().subscribe((size) => {
      this._changeViewportSize(size);
    });
  }

  private _changeViewportSize(size: Sizes): void {
    this.viewContainer.clear();

    if (size === this._size) {
      this.viewContainer.createEmbeddedView(this.templateRef);
    }
  }

  ngOnDestroy(): void {
    this._subscription.unsubscribe();
  }
}
