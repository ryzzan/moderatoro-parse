import { Injectable } from '@angular/core';

@Injectable()
export class ObjectService {

  constructor() { }

  checkInterface = (dataToCompare: any, interfaceToCheck: any) => new Promise((resolve, reject) => {
    let countChecked, countAttrInterface, dataToCompareAttributes, dataToResolve;
    countChecked = 0;
    countAttrInterface = 0;
    dataToResolve = [];

    if(dataToCompare.length > 0) dataToCompareAttributes = dataToCompare[0];
    
    for (let attrInterface in interfaceToCheck) {
      let check = 0;
      if (interfaceToCheck.hasOwnProperty(attrInterface)) {
        for (let attrData in dataToCompareAttributes) {
          if(attrData === attrInterface) {
            check = 1;
          }
        }

        if(check) countChecked ++;

        countAttrInterface ++;
      }
    }
    
    if (countAttrInterface === countChecked) {
      resolve(true);
    } else {
      reject("Erro de checagem de interface");
    }
  })
}