import { Injectable } from '@angular/core';

@Injectable()
export class ArrayService {

  constructor() { }

  clear = (array: any[]) => {
    return array = [];
  }

  removeByValue = (array: any[], value: any[]) => new Promise((resolve, reject) => {
    for (let lim = array.length, i = 0; i < lim; i++) {
      for (let limV = value.length, j = 0; j < limV; j++) {
        if (value[j] === array[i]) {
          array.splice(array.indexOf(value[j]), 1);
        }
      }
    }

    resolve(array);
  })

  changePlacesByIndex = (index: number, array: any[], upOrDown: string, ) => new Promise((resolve, reject) => {
    let temp;
    if (upOrDown === 'up') {
      if (index === 0) { // Change first element to last and last to first
        temp = array[array.length - 1];
        array[array.length - 1] = array[0];
        array[0] = temp;
      } else {
        temp = array[index - 1];
        array[index - 1] = array[index];
        array[index] = temp;
      }
    } else if (upOrDown === 'down') {
      if (index === (array.length - 1)) { // Change last element to first and first to last
        temp = array[0];
        array[0] = array[array.length - 1];
        array[array.length - 1] = temp;
      } else {
        temp = array[index + 1];
        array[index + 1] = array[index];
        array[index] = temp;
      }
    } else {
      reject('You must define if it will move up or down');
    }

    resolve(array);
  })
}
