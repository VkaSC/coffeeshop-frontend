import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'boolValue'
})
export class BoolValuePipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return value ? 'SI' : 'NO';
  }

}
