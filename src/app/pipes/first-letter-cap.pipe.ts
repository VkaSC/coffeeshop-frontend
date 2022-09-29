import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'firstLetterCap'
})
export class FirstLetterCapPipe implements PipeTransform {

  transform(value?: string, ...args: unknown[]): unknown {
    return value && value.length > 0 ? value.substring(0, 1).toUpperCase() : '';
  }

}
