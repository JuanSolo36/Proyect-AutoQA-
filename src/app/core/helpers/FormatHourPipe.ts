import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatHour'
})
export class FormatHourPipe implements PipeTransform {
  transform(value: string): string {
    const dateObj = new Date(value);
    return dateObj.toTimeString().split(' ')[0];
  }
}