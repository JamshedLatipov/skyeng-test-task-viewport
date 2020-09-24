import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ViewportSizeModule } from './modules/viewport-size/viewport-size.module';
import { HelloComponent } from './hello.component';

@NgModule({
  declarations: [AppComponent, HelloComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ViewportSizeModule.configure({ medium: 800, large: 1000 }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
