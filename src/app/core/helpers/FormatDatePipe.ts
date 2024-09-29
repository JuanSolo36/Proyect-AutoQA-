import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatDate'
})
export class FormatDatePipe implements PipeTransform {
  transform(value: string): string {
    const dateObj = new Date(value);
    return dateObj.toISOString().split('T')[0];
  }
}