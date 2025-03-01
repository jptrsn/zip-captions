import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: 'hoursminutes'
})
export class HoursMinutesPipe implements PipeTransform {
  transform(milliseconds: number | undefined) {
    let rtn = '';
    if (milliseconds === undefined) return rtn;
    if (milliseconds === 0) return 0;
    const totalSeconds = Math.floor(milliseconds / 1000);
    const totalMinutes = Math.floor(milliseconds / (1000 * 60));
    const totalHours = Math.floor(milliseconds / (1000 * 60 * 60));
    const totalDays = Math.floor(milliseconds / (1000 * 60 * 60 * 24));

    if (totalDays > 0) {
      rtn += `${totalDays} d`
    }
    if (totalHours > 0 || rtn.length) {
      if (rtn.length) {
        rtn += ` `;
      }
      rtn += `${totalHours % 24}h`;
    }
    if (totalMinutes > 0 || rtn.length) {
      if (rtn.length) {
        rtn += ` `;
      }
      const m = (totalMinutes % 60).toString().padStart(2, '0')
      rtn += `${m}m`;
    }
    if (totalSeconds > 0 && (totalSeconds % 60)) {
      if (rtn.length) {
        rtn += ` `;
      }
      const s = (totalSeconds % 60).toString().padStart(2, '0')
      rtn += `${s} s`;
    }
    return rtn;
  }
}