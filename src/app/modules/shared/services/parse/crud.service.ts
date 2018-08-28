import { Injectable, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';

import { Parse } from 'parse';

@Injectable({
  providedIn: 'root'
})
export class CrudService {
  constructor(
    private _snackbar: MatSnackBar,
    private _router: Router
  ) {
    Parse.initialize('thcu7IuHJHPDH8n0SqG2m6wRRLUA7pGyAHFLVkzs', 'IYLVaGn4u809YBJO0y6dAirCQIPrUCzOQRq8TweO');
    Parse.serverURL = 'https://parseapi.back4app.com/';
  }

  create = (params)  => new Promise((res, rej) => {
    // Set params errors: start
    if (!params) {
      res({
        code: 'c-error-01',
        message: 'Defina parâmetros mínimos'
      });
    } else {
      if (!params.collection) {
        res({
          code: 'c-error-02',
          message: 'Parâmetro obrigatório: collection'
        });
      }

      if (!params.object) {
        res({
          code: 'c-error-03',
          message: 'Parâmetro obrigatório: object'
        });
      }
    }
    // Set params errors: end

    let obj;

    obj = new params.object;
  })

  delete = (params)  => new Promise((res, rej) => {
  })
}
