import {NgModule} from '@angular/core';

import {
  MatDatepickerModule,
  MatInputModule, MAT_DATE_LOCALE, MAT_DATE_FORMATS, MatTabsModule
} from '@angular/material';

import {MatMomentDateModule} from '@angular/material-moment-adapter';
import {MomentDateModule} from '@angular/material-moment-adapter';

export const MY_FORMATS = {
  parse: {
    dateInput: 'LL',
  },
  display: {
    dateInput: 'LL',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

@NgModule({
  declarations: [],
  imports: [
    MomentDateModule,
    MatMomentDateModule,
    MatDatepickerModule,
    MatInputModule,
    MatTabsModule
  ],
  exports: [
    MomentDateModule,
    MatMomentDateModule,
    MatDatepickerModule,
    MatInputModule,
    MatTabsModule
  ],
  providers: [
    {provide: MAT_DATE_LOCALE, useValue: 'en-USA'},
    {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS}
  ]
})
export class AppAngularMaterialModule {
}
