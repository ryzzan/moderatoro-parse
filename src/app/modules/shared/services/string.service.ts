import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StringService {

  constructor() { }

  transformCamelCaseOrUnderlinedString = (string: string, stringTransformedCase: string) => new Promise((resolve, reject) => {
    const letter = [];
    let response = '', responseArray = [], temp = '', tempArray = [];

    tempArray = string.split('_');

    if (tempArray.length < 2) {
      tempArray = string.split('-');
    }

    if (tempArray.length > 1) {
      /**
       * String underlined: start
       */
      for (let i = 0; i < tempArray.length; i++) {
        response += tempArray[i].toLowerCase() + ' ';
      }

      responseArray = response.split(' ');
      /**
       * String underlined: end
       */
    } else {
      /**
       * Camel case string: start
       */
      let firstIsUpperCase = false, newString = '', splits = [];

      if (string.charAt(0).match(/[A-Z0-9]/)) {
        firstIsUpperCase = true;
      }

      for (let i = 0; i < string.length; i++) {
        const element = string[i];
        if (element.match(/[A-Z0-9]/)) {
          letter.push(element.match(/[A-Z0-9]/));
          newString += ' ';
        } else {
          newString += string[i];
        }
      }

      splits = newString.split(' ');

      if (!firstIsUpperCase) {
        response = splits[0] + ' ';

        for (let i = 0; i < (splits.length - 1); i++) {
          response += letter[i] + splits[i + 1] + ' ';
        }
      } else {
        for (let i = 0; i < (splits.length - 1); i++) {
          response += letter[i] + splits[i + 1] + ' ';
        }
      }

      response = response.substring(0, response.length - 1);

      responseArray = response.split(' ');
      /**
       * Camel case string: end
       */
    }

    switch (stringTransformedCase) {
      case 'camel':
        for (let i = 0; i < responseArray.length; i++) {
          temp += responseArray[i].toLowerCase().charAt(0).toUpperCase() + responseArray[i].slice(1) + ' ';
        }
        break;

      case 'first':
        for (let i = 0; i < responseArray.length; i++) {
          (i === 0)
          ? temp += responseArray[i].toLowerCase().charAt(0).toUpperCase() + responseArray[i].slice(1) + ' '
          : temp += responseArray[i].toLowerCase() + ' ';
        }
        break;

      case 'upper':
        for (let i = 0; i < responseArray.length; i++) {
          temp += responseArray[i].toUpperCase() + ' ';
        }
        break;

      case 'lower':
        for (let i = 0; i < responseArray.length; i++) {
          temp += responseArray[i].toLowerCase() + ' ';
        }
        break;

      default:
        break;
    }

    response = temp;

    resolve(response);
  })
}
