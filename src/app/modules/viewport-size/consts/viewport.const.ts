import { InjectionToken } from '@angular/core';
import { IConfig } from '../../viewport-size/interfaces/config.interface';

export const VIEWPORT_CONFIG: InjectionToken<IConfig> = new InjectionToken(
  'ViewportConfig',
);
