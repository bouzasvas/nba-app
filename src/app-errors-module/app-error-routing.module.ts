import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {ErrorComponent} from './components/error/error.component';

const routes: Routes = [
  // {path: '**', component: PageNotFound},
  {path: 'error', component: ErrorComponent}
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppErrorRoutingModule { }
