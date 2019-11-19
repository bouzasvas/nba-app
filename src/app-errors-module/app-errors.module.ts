import {ErrorHandler, NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import {AppErrorHandlerService} from './handlers/app-error-handler.service';
import {ErrorComponent} from './components/error/error.component';
import {AppErrorRoutingModule} from './app-error-routing.module';

@NgModule({
  declarations: [
    ErrorComponent,
  ],
  imports: [
    CommonModule,
    AppErrorRoutingModule
  ],
  exports: [
    CommonModule
  ]
})
export class AppErrorsModule { }
