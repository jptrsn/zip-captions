import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: 'duration',
})
export class DurationPipe implements PipeTransform {
  transform(value: (string | number | Date | undefined), ...args: (string | number | Date | undefined)[]): string {
    try {
      let rtn = '';
      if (!value || !args[0]) {
        return rtn;
      }
      
      const d1 = new Date(value).getTime();
      const d2 = new Date(args[0]).getTime();

      const absDiff = Math.abs(d1 - d2);
      
      if (absDiff < 1000) {
        return '0s'
      }
      const totalSeconds = Math.floor(absDiff / 1000);
      const totalMinutes = Math.floor(absDiff / (1000 * 60));
      const totalHours = Math.floor(absDiff / (1000 * 60 * 60));
      const totalDays = Math.floor(absDiff / (1000 * 60 * 60 * 24));

      if (totalDays > 0) {
        rtn += `${totalDays} d`
      }
      if (totalHours > 0 || rtn.length) {
        if (rtn.length) {
          rtn += `, `;
        }
        rtn += `${totalHours % 24} h`;
      }
      if (totalMinutes > 0 || rtn.length) {
        if (rtn.length) {
          rtn += `, `;
        }
        rtn += `${totalMinutes % 60} m`;
      }
      if (totalSeconds > 0 || rtn.length) {
        if (rtn.length) {
          rtn += `, `;
        }
        rtn += `${totalSeconds % 60} s`;
      }
      return rtn;

    } catch(e: any) {
      console.warn(`Invalid duration pipe values, `, e.message);
      return '';
    }
  }
}