import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers } from '@angular/http';

import { environment } from '../../../../../environments/environment';

@Injectable()
export class CrudService {

  constructor(
    private _http: Http
  ) { }

  create = (params) => new Promise((resolve, reject) => {
    const userData = JSON.parse(JSON.parse(sessionStorage.user)._body),
      headersToAuth = new Headers({
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }),
      optionsToAuth = new RequestOptions({
        'headers': headersToAuth
      });

    this._http
      .post(
        environment.crudServiceUrl + '/' + params.route + '?access_token=' + userData.id,
        params.objectToCreate,
        optionsToAuth
      ).subscribe(res => {
        console.log(res);
      });
  })

  read = (params) => new Promise((resolve, reject) => {
    const userData = JSON.parse(JSON.parse(sessionStorage.user)._body);

    this._http
      .get(
        environment.crudServiceUrl + '/' + params.route + '?access_token=' + userData.id
      ).subscribe(res => {
        console.log(res);
      });
  })

  delete = (params) => new Promise((resolve, reject) => {
    const route: string = params.route,
    paramToDelete: any = params.paramToDelete;

    if (!route) {
      reject({
        cod: 'd-01',
        message: 'Informar erro d-01 ao administrador'
      });
    }

    if (!paramToDelete) {
      reject({
        cod: 'd-02',
        message: 'Informar erro d-02 ao administrador'
      });
    }

    const userData = JSON.parse(JSON.parse(sessionStorage.user)._body),
    headersToAuth = new Headers({
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    }),
    optionsToAuth = new RequestOptions({
      'headers': headersToAuth
    });

    for (let lim = paramToDelete.length, i = 0; i < lim; i++) {
      this._http.delete(
        environment.crudServiceUrl + '/' + params.route + paramToDelete[i] + '?access_token=' + userData.id,
         optionsToAuth)
        .subscribe(res => {
          if (i === (lim - 1)) {
            resolve({
              cod: 'u-03',
              message: 'Ítens apagados com sucesso'
            });
          }
        }, rej => {
          if (rej['_body']) {
            const json = JSON.parse(rej['_body']);
            let message = json.message;

            if (!message || message === '') {
              message = 'Erro ao apagar';
            }

            reject({
              cod: 'error-c-01',
              message: message,
              apiBody: json
            });
          } else {
            console.log(rej);
          }
        });
    }
  })
}
