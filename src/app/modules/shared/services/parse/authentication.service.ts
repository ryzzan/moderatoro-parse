import { Injectable, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';

import { Parse } from 'parse';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  constructor(
    private _snackbar: MatSnackBar,
    private _router: Router
  ) {
    Parse.initialize('thcu7IuHJHPDH8n0SqG2m6wRRLUA7pGyAHFLVkzs', 'IYLVaGn4u809YBJO0y6dAirCQIPrUCzOQRq8TweO');
    Parse.serverURL = 'https://parseapi.back4app.com/';
  }

  login = (params) => new Promise((res, rej) => {
    // Set params errors: start
    if (!params) {
      res({
        code: 'l-error-01',
        message: 'Defina parâmetros mínimos'
      });
    } else {
      if (!params.user) {
        res({
          code: 'l-error-02',
          message: 'Parâmetro obrigatório: user'
        });
      }

      if (!params.password) {
        res({
          code: 'l-error-03',
          message: 'Parâmetro obrigatório: password'
        });
      }

      if (!params.loginMode) {
        res({
          code: 'l-error-04',
          message: 'Parâmetro obrigatório: loginMode'
        });
      }

      if (!params.navigateTo) {
        res({
          code: 'l-error-05',
          message: 'Parâmetro obrigatório: navigateTo'
        });
      }
    }
    // Set params errors: end
    if (params.loginMode === 'emailAndPassword') { console.log(params);
      Parse.User.logIn(params.user, params.password)
      .catch(pErr => {
        if (pErr) {
          this._snackbar.open(pErr['message'], '', {
            duration: 4000
          });
        }
      })
      .then(pRes => {
        if (pRes && pRes.attributes.sessionToken) {
          console.log(Parse.User.current());
          pRes['code'] = 'l-success-01';
          pRes['message'] = 'Welcome';

          this._router.navigate([params.navigateTo]);

          this._snackbar.open(pRes['message'], '', {
            duration: 4000
          });

          res(pRes);
        } else {
          res(pRes);
          if (pRes) {
            this._snackbar.open(pRes['message'], '', {
              duration: 4000
            });
          }
        }
      });
    }
  })

  logout = (params) => new Promise((res, rej) => {
    if (!params) {
      res({
        code: 'lg-error-01',
        message: 'Defina parâmetros mínimos'
      });
    } else {
      if (!params.navigateTo) {
        res({
          code: 'lg-error-02',
          message: 'Parâmetro obrigatório: navigateTo'
        });
      }

      Parse.User.logOut();

      this._router.navigate([params.navigateTo]);
    }
  })

  getUser = () => {
    return Parse.User.current();
  }
}
