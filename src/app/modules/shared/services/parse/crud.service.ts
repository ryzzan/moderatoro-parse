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
    Parse.initialize('qPZfPQPQGttsCpugKLR1j6BNqlLJ1G2WTIEqKH9H', 'wKafb4TZ5Pj0Gw8BMvNyfDdGW5U8S0jaRsGvx5C7');
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
      if (!params.route) {
        res({
          code: 'c-error-02',
          message: 'Parâmetro obrigatório: route'
        });
      }

      if (!params.objectToCreate) {
        res({
          code: 'c-error-03',
          message: 'Parâmetro obrigatório: objectToCreate'
        });
      }
    }
    // Set params errors: end
    const route = params.route, Class = new Parse.Object.extend(route);
    let object, objectToCreate, objectProperties;

    objectToCreate = params.objectToCreate;
    objectProperties = Object.keys(objectToCreate);
    object = new Class();

    for (let i = 0; i < objectProperties.length; i++) {
      const element = objectProperties[i];
      object.set(element, objectToCreate[element]);
    }

    object.save()
    .then((resolve) => {
      // Execute any logic that should take place after the object is saved.
      res({
        message: 'Novo objeto criado com objectId ' + resolve.id
      });
    }, (error) => {
      // Execute any logic that should take place if the save fails.
      // error is a Parse.Error with an error code and message.
      rej({
        message: 'Falha ao criar objeto, com o seguinte código de erro: ' + error.message
      });
    });
  })

  delete = (params)  => new Promise((res, rej) => {
    // Set params errors: start
    if (!params) {
      res({
        code: 'd-error-01',
        message: 'Defina parâmetros mínimos'
      });
    } else {
      if (!params.route) {
        res({
          code: 'd-error-02',
          message: 'Parâmetro obrigatório: route'
        });
      }

      if (!params.where && !params.containedIn) {
        res({
          code: 'd-error-03',
          message: 'Parâmetro obrigatório: where OU containedIn'
        });
      }
    }
    // Set params errors: end
    const route = params.route, Class = new Parse.Object.extend(route);
    let containedIn, where, object;
    params.where ? where = params.where : where = undefined;
    params.containedIn ? containedIn = params.containedIn : containedIn = undefined;
    object = new Class();

    this.readFromRoute({
      route: route,
      where: where,
      containedIn: containedIn
    })
    .then(resolve => {
      object = resolve['response'];

      if (object.length > 0) {
        for (let i = 0; i < object.length; i++) {
          const element = object[i];
          element.destroy()
          .then((resolveDelete) => {
            // Execute any logic that should take place after the object is saved.
          }, (error) => {
            // Execute any logic that should take place if the save fails.
            // error is a Parse.Error with an error code and message.
            rej({
              message: 'Falha ao criar objeto, com o seguinte código de erro: ' + error.message
            });
          });
        }

        if (containedIn) {
          let stringToMessage = '';

          for (let i = 0; i < containedIn.length; i++) {
            if (containedIn[i].valueArray.length > 1) {
              for (let j = 0; j < containedIn[i].valueArray.length; j++) {
                const element = containedIn[i].valueArray[j];
                stringToMessage += element;

                if (j < containedIn[i].valueArray.length - 2) {
                  stringToMessage += ', ';
                } else {
                  if (j < containedIn[i].valueArray.length - 1) {
                    stringToMessage += ' e ';
                  }
                }
              }

              res({
                message: 'Objetos com os objectIds ' + stringToMessage + ' foram destruídos'
              });
            } else {
              res({
                message: 'Objeto com objectId ' + containedIn[0].valueArray[0] + ' foi destruído'
              });
            }
          }
        } else {
          res({
            message: 'Objeto com objectId ' + containedIn[0].valueArray[0] + ' foi destruído'
          });
        }
      }
    });
  })

  readFromRoute = (params) => new Promise((res, rej) => {
    let group, limit, match, containedIn, message, order, query, route, skip, where;
    params.group ? group = params.group : group = undefined;
    params.limit ? limit = params.limit : limit = undefined;
    params.containedIn ? containedIn = params.containedIn : containedIn = undefined;
    params.match ? match = params.match : match = undefined;
    params.message ? message = params.message : message = 'Sucesso';
    params.order ? order = params.order : order = undefined;
    params.skip ? skip = params.skip : skip = undefined;
    params.where ? where = params.where : where = undefined;
    route = params.route;

    const Class = Parse.Object.extend(route);
    query = new Parse.Query(Class);

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

    if (where) {
      for (let i = 0; i < where.length; i++) {
        query.equalTo(where[i].property, where[i].value);
      }
    }

    if (containedIn) {
      for (let i = 0; i < containedIn.length; i++) {
        query.containedIn(containedIn[i].property, containedIn[i].valueArray);
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

  update = (params) => new Promise((res, rej) => {
    if (!params) {
      res({
        code: 'u-error-01',
        message: 'Defina parâmetros mínimos'
      });
    } else {
      if (!params.route) {
        res({
          code: 'u-error-02',
          message: 'Parâmetro obrigatório: route'
        });
      }

      if (!params.where && !params.containedIn) {
        res({
          code: 'u-error-03',
          message: 'Parâmetro obrigatório: where OU containedIn'
        });
      }

      if (!params.objectToUpdate) {
        res({
          code: 'u-error-04',
          message: 'Parâmetro obrigatório: objectToUpdate'
        });
      }
    }
    // Set params errors: end
    const route = params.route, Class = new Parse.Object.extend(route);
    let object, objectToUpdate, objectProperties, where;

    objectToUpdate = params.objectToUpdate;
    objectProperties = Object.keys(objectToUpdate);
    params.where ? where = params.where : where = undefined;

    object = new Class();


    object.set(where.property, where.value);

    for (let i = 0; i < objectProperties.length; i++) {
      const element = objectProperties[i];
      object.set(element, objectToUpdate[element]);
    }

    object.save()
    .then((resolve) => {
      // Execute any logic that should take place after the object is saved.
      res({
        message: 'Objeto atualizado com objectId ' + resolve.id
      });
    }, (error) => {
      // Execute any logic that should take place if the save fails.
      // error is a Parse.Error with an error code and message.
      rej({
        message: 'Falha ao atualizar objeto, com o seguinte código de erro: ' + error.message
      });
    });
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
