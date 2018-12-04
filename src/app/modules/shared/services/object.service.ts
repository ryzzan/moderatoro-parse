import { Injectable } from '@angular/core';

@Injectable()
export class ObjectService {

  constructor() { }

  checkExistenceOfAttributeValue = (object: any, attributeToCheck: string, valueToCheck: string) => new Promise((resolve, reject) => {
    if (object) {
      if (object.length && object.length > 0) {
        for (let i = 0; i < object.length; i++) {
          const element = object[i];
          console.log(element, element[attributeToCheck], attributeToCheck, valueToCheck);
          if (element[attributeToCheck] === valueToCheck) {
            resolve({attributeValueExists: true});
          }
        }

        resolve({attributeValueExists: false});
      } else {
        (object[attributeToCheck] === valueToCheck)
        ? resolve({attributeValueExists: true})
        : resolve({attributeValueExists: false});
      }
    }
  })

  checkInterface = (dataToCompare: any, interfaceToCheck: any) => new Promise((resolve, reject) => {
    let countChecked, countAttrInterface, dataToCompareAttributes, dataToResolve;
    countChecked = 0;
    countAttrInterface = 0;
    dataToResolve = [];

    if (dataToCompare.length > 0) {
      dataToCompareAttributes = dataToCompare[0];
    }

    // tslint:disable-next-line:forin
    for (const attrInterface in interfaceToCheck) {
      let check = 0;
      if (interfaceToCheck.hasOwnProperty(attrInterface)) {
        for (const attrData in dataToCompareAttributes) {
          if (attrData === attrInterface) {
            check = 1;
          }
        }

        if (check) {
          countChecked ++;
        }

        countAttrInterface ++;
      }
    }

    if (countAttrInterface === countChecked) {
      resolve(true);
    } else {
      reject('Erro de checagem de interface');
    }
  })
}
