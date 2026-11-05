import { Pipe, PipeTransform } from '@angular/core';

const MONTHS = {
  ar: ['يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو', 'يوليو', 'أغسطس', 'سبتمبر', 'أكتوبر', 'نوفمبر', 'ديسمبر'],
  en: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
};

/** Formats an ISO date (yyyy-mm-dd) as "5 November 2026" / "5 نوفمبر 2026", identically on server and browser. */
@Pipe({ name: 'siteDate' })
export class SiteDatePipe implements PipeTransform {
  transform(iso: string, lang: 'en' | 'ar'): string {
    const [y, m, d] = iso.split('-').map(Number);
    return `${d} ${MONTHS[lang][m - 1]} ${y}`;
  }
}
