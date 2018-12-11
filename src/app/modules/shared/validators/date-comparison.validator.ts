import {
  AbstractControl
} from '@angular/forms';

export function ValidateDateDMYHMSComparison(controlToCompare: AbstractControl, logicProperty: string, errorMessage: string) {
  let flagFirst = true;
  console.log(controlToCompare);
  return (control: AbstractControl) => {
    if (controlToCompare && controlToCompare.value) {
      console.log(controlToCompare.value.length);
    }
    if (
      (control.value
      && (control.value.length === 10 || control.value.length === 19))
      && controlToCompare
      && controlToCompare.value
      && (controlToCompare.value.length === 10 || controlToCompare.value.length === 19)
    ) { console.log(15);
      if (flagFirst) {
        flagFirst = false;
        controlToCompare.valueChanges.subscribe(res => {
          control.patchValue(control.value);
        });
      }

      /**
       * Set date typed: start
       */
      const date = control.value;
      let dateControl, timeControl, day, month, year, hour, minute, second;
      dateControl = date.split(' ')[0];
      day = dateControl.split('/')[0];
      month = dateControl.split('/')[1];
      year = dateControl.split('/')[2];

      hour = '00';
      minute = '00';
      second = '00';

      if (date.split(' ')[1]) {
        timeControl = date.split(' ')[1];
        hour = timeControl.split(':')[0];
        minute = timeControl.split(':')[1];
        second = timeControl.split(':')[2];
      }

      const dateTyped = new Date(year + '-' + month + '-' + day + 'T' + hour + ':' + minute + ':' + second);
      /**
       * Set date typed: end
       */

      /**
       * Set date to compare: start
       */
      const date2 = controlToCompare.value;
      let dateControl2, timeControl2, day2, month2, year2, hour2, minute2, second2;
      dateControl2 = date2.split(' ')[0];
      day2 = dateControl2.split('/')[0];
      month2 = dateControl2.split('/')[1];
      year2 = dateControl2.split('/')[2];

      hour2 = '00';
      minute2 = '00';
      second2 = '00';

      if (date.split(' ')[1]) {
        timeControl2 = date.split(' ')[1];
        hour2 = timeControl2.split(':')[0];
        minute2 = timeControl2.split(':')[1];
        second2 = timeControl2.split(':')[2];
      }

      const dateToCompare = new Date(year2 + '-' + month2 + '-' + day2 + 'T' + hour2 + ':' + minute2 + ':' + second2);
      /**
       * Set date to compare: end
       */
      console.log(dateToCompare);
      if (logicProperty === '==' || logicProperty === '===') {
        if (dateTyped !== dateToCompare) {
          return { validate: false, message: errorMessage };
        }

        return null;
      }

      if (logicProperty === '>') {
        if (dateTyped < dateToCompare) {
          return { validate: false, message: errorMessage };
        }

        return null;
      }

      if (logicProperty === '<') {
        if (dateTyped > dateToCompare) {
          return { validate: false, message: errorMessage };
        }

        return null;
      }

      if (logicProperty === '>=') {
        if (dateTyped <= dateToCompare) {
          return { validate: false, message: errorMessage };
        }

        return null;
      }

      if (logicProperty === '<=') {
        if (dateTyped >= dateToCompare) {
          return { validate: false, message: errorMessage };
        }

        return null;
      }
    }
  };
}
