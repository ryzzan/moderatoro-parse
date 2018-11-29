import { Injectable, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';

/**
 * Services
 */
import { ArrayService } from '../array.service';

/**
 * Third party
 */
import { Parse } from 'parse';

@Injectable({
  providedIn: 'root'
})
export class CrudService {
  constructor(
    private _array: ArrayService
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
    let group, limit, match, message, order, query, route, skip;
    params.group ? group = params.group : group = undefined;
    params.limit ? limit = params.limit : limit = undefined;
    params.match ? match = params.match : match = undefined;
    params.message ? message = params.message : message = 'Sucesso';
    params.order ? order = params.order : order = undefined;
    params.skip ? skip = params.skip : skip = undefined;
    route = params.route;

    query = new Parse.Query(new Parse.Object(route));

    if (skip) {
      query.skip(skip);
    }
    if (limit) {
      query.limit(limit);
    }
    if (match) {
      for (let i = 0; i < match.keys.length; i++) {
        query.matches(match.keys[i], new RegExp(match.regex[i], 'gi'));
      }
    }

    query.find()
    .then(response => {
      if (group) {
        this._array.sortArrayOfObjectsByAttributeValue(response, group);
        // Criar objeto de respostas retirando o que for repetindo de acordo com os valores de agrupamento

        for (let i = 0; i < group.length; i++) {
          let checkGroupValue = '';
          for (let j = 0; j < response.length; j++) {
            if (checkGroupValue === response[j]['attributes'][group[i]['field']]) {
              response.splice(j, 1);
            } else {
              checkGroupValue = response[j]['attributes'][group[i]['field']];
            }
          }
        }
      }

      if (order) {

      }

      if (match) {
        query.count()
        .then(resCount => {
          res({
            message: message,
            response: response,
            total: resCount
          });
        });
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

  groupingObject = () => {

  }
}
