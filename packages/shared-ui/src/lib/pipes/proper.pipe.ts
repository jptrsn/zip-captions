import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'proper',
})
export class ProperPipe implements PipeTransform {
  transform(value: string, ...args: unknown[]): string {
    return value[0].toUpperCase() + value.slice(1).toLowerCase();
  }
}
