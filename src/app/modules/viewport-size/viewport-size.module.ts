import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IfViewportSizeDirective } from './directives/if-viewport-size.directive';
import { ViewportSizeService } from './services/viewport-size.service';
import { IConfig } from './interfaces/config.interface';
import { VIEWPORT_CONFIG } from './consts/viewport.const';

@NgModule({
  declarations: [IfViewportSizeDirective],
  imports: [CommonModule],
  exports: [IfViewportSizeDirective],
  providers: [ViewportSizeService],
})
export class ViewportSizeModule {
  static configure(config: IConfig): ModuleWithProviders<ViewportSizeModule> {
    return {
      ngModule: ViewportSizeModule,
      providers: [{ provide: VIEWPORT_CONFIG, useValue: config }],
    };
  }
}
