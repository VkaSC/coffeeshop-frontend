import { Pipe, PipeTransform } from '@angular/core';
import DateUtils from '../libs/utils/date.utils';

@Pipe({
  name: 'millisToEsDate'
})
export class MillisToEsDatePipe implements PipeTransform {

  transform(value: number, ...args: unknown[]): string {
    return value !== undefined ? DateUtils.formatShortEsES(new Date(value)) : '';
  }

}
