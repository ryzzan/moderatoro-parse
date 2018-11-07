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
    let route: string, paramToDelete: any;
    route = params.route;
    paramToDelete = params.paramToDelete;
  })

  readFromRoute = (params) => new Promise((res, rej) => {
    let limit, match, message, query, route, skip;
    params.limit ? limit = params.limit : limit = undefined;
    params.match ? match = params.match : match = undefined;
    params.message ? message = params.message : message = 'Sucesso';
    params.skip ? skip = params.skip : skip = undefined;
    console.log(params);
    route = params.route;

    query = new Parse.Query(new Parse.Object(route));

    if (skip) query.skip(skip);
    if (limit) query.limit(limit);
    if (match) {
      for (let i = 0; i < match.keys.length; i++) {
        query.matches(match.keys[i], new RegExp(match.regex[i], 'gi'));
      }
    }
    
    query.find()
    .then(response => {
      if(match) {
        query.count()
        .then(resCount => {
          console.log(resCount);
          res({
            message: message,
            response: response,
            total: resCount
          });
        })
      } else {
        res({
          message: message,
          response: response
        });
      }
    });
  })

  readFromObject = (params) => new Promise((res, rej) => {
  })

  countFromRoute = (params) => new Promise((res, rej) => {
    let route, message;
    params.message ? message = params.message : message = 'Sucesso';
    route = params.route;

    new Parse.Query(new Parse.Object(route)).count()
    .then(response => {
      res({
        message: message,
        response: response
      });
    });
  })
}
