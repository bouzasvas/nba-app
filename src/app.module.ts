import {BrowserModule} from '@angular/platform-browser';
import {ErrorHandler, NgModule} from '@angular/core';

import {AppComponent} from './components/app/app.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {HeaderComponent} from './components/header/header.component';
import {FooterComponent} from './components/footer/footer.component';
import {AppRoutingModule} from './app-routing.module';
import {GamesComponent} from './components/games/games.component';
import {StandingsComponent} from './components/standings/standings.component';
import {LoaderComponent} from './components/loader/loader.component';
import {AppHttpInterceptor} from './common/http-interceptor';
import {LoggerService} from './services/logger.service';
import {LoaderService} from './services/loader.service';
import {AppErrorHandlerService} from './common/app-error-handler.service';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    GamesComponent,
    StandingsComponent,
    LoaderComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [
    {
      provide: ErrorHandler,
      useClass: AppErrorHandlerService
    },
    {provide: HTTP_INTERCEPTORS,
      useClass: AppHttpInterceptor,
      multi: true,
      deps: [ LoggerService, LoaderService ]
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
