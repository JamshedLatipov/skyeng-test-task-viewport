import { DOCUMENT } from '@angular/common';
import { Inject, Injectable, NgZone, OnDestroy, Optional } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { auditTime, map, pluck, tap } from 'rxjs/operators';
import { VIEWPORT_CONFIG } from '../consts/viewport.const';
import { Sizes } from '../directives/if-viewport-size.directive';
import { IConfig } from '../interfaces/config.interface';

@Injectable()
export class ViewportSizeService implements OnDestroy {
  private _viewportSize: { width: number; height: number };
  private _change = new Subject<Event>();
  private _document: Document;
  private _changeListener = (event: Event) => {
    this._change.next(event);
  };

  constructor(
    private _ngZone: NgZone,
    @Optional()
    @Inject(DOCUMENT)
    document: any,
    @Inject(VIEWPORT_CONFIG)
    private _config: IConfig,
  ) {
    this._document = document;

    _ngZone.runOutsideAngular(() => {
      const window = this._getWindow();
      window.addEventListener('resize', this._changeListener);
      window.addEventListener('orientationchange', this._changeListener);
      this.change().subscribe(() => this._updateViewportSize());
    });
  }

  public ngOnDestroy(): void {
    const window = this._getWindow();
    window.removeEventListener('resize', this._changeListener);
    window.removeEventListener('orientationchange', this._changeListener);

    this._change.complete();
  }

  public getInitialSize(): Sizes {
    const width = this.getViewportSize().width;
    return this._getSizeString(width);
  }

  public getViewportSize(): Readonly<{ width: number; height: number }> {
    if (!this._viewportSize) {
      this._updateViewportSize();
    }

    const output = {
      width: this._viewportSize.width,
      height: this._viewportSize.height,
    };

    return output;
  }

  public change(throttleTime: number = 200): Observable<Sizes> {
    return this._change.pipe(
      auditTime(throttleTime),
      pluck('target'),
      map((target: any) => this._getSizeString(target.innerWidth)),
    );
  }

  private _getWindow(): Window {
    return this._document.defaultView || window;
  }

  private _updateViewportSize() {
    const window = this._getWindow();
    this._viewportSize = {
      width: window.innerWidth,
      height: window.innerHeight,
    };
  }

  private _getSizeString(width: number): Sizes {
    if (width < this._config.medium) {
      return 'small';
    } else if (this._config.medium <= width && width < this._config.large) {
      return 'medium';
    } else if (this._config.large <= width) {
      return 'large';
    }
  }
}
