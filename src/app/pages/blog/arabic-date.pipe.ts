import { Pipe, PipeTransform } from '@angular/core';

const MONTHS = ['يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو', 'يوليو', 'أغسطس', 'سبتمبر', 'أكتوبر', 'نوفمبر', 'ديسمبر'];

/** Formats an ISO date (yyyy-mm-dd) as "5 نوفمبر 2026", identically on server and browser. */
@Pipe({ name: 'arDate' })
export class ArabicDatePipe implements PipeTransform {
  transform(iso: string): string {
    const [y, m, d] = iso.split('-').map(Number);
    return `${d} ${MONTHS[m - 1]} ${y}`;
  }
}
