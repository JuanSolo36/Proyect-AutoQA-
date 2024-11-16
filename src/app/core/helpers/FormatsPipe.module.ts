import { NgModule } from '@angular/core';
import { CommonModule, formatDate } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PrimengModule } from '../../shared/primeng/primeng/primeng.module';
import { FormatDatePipe } from './FormatDatePipe';
import { FormatHourPipe } from './FormatHourPipe';



@NgModule({
  declarations: [
    FormatDatePipe,
    FormatHourPipe
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    PrimengModule
  ],
  exports: [
    FormatDatePipe,
    FormatHourPipe
  ]
})
export class FormatsPipeModule { }
