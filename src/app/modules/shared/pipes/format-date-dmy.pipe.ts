import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatDateDmy'
})
export class FormatDateDmyPipe implements PipeTransform {

  transform(date: any): any {
    let newDate, day, finalDate, month, finalMonth, final;
    newDate = new Date(date);
    day = Number(newDate.getDate());
    month = Number(newDate.getMonth()) + 1;

    (month < 10) ? finalMonth = '0' + month : finalMonth = month;
    (day < 10) ? finalDate = '0' + day : finalDate = day;

    final = finalDate + '/' + finalMonth + '/' + newDate.getFullYear();
    return final;
  }
}
