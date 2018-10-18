import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'numberToLetter'
})
export class NumberToLetterPipe implements PipeTransform {

  transform(number: number): any {
    let alphabetArray, checkNumber, letter;

    // tslint:disable-next-line:max-line-length
    alphabetArray = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
    checkNumber = number;

    if (number > 26) {
      while (checkNumber > 26) {
        checkNumber = checkNumber - 26;
      }
    }

    letter = alphabetArray[checkNumber - 1];
    return letter;
  }

}
