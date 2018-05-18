/**
 * @description Deals with authentication properties and methods based on firebase authentication service
 * 
 * @method login() - validates or not the authentication of user and its password
 *    @param {Object} params - required
 *    @param {string} params.loginMode - required - possible values: emailAndPassword
 *    @param {string} params.user -required - possible values: will depend on loginMode (a validate email so far, based on emailAndPassword loginMode)
 *    @param {string} params.password - required
 *    @param {string} params.navigateTo - required - e.g.: '/main'
 *        @returns default data from firebase authentication method (according to loginMode) plus code and message hard coded if login is successful
 * 
 * @method logout - destroys loggedin user session using firebase method
 *    @param {string} params.navigateTo - required - e.g.: '/login'
 *    @returns code and message according to succesful or failed logout
 * 
 * @method setUser - returns user data if there is one loggedin
 *    @returns user id and firebase object related to loggedin user if there is one, and false if there is no user loggedin
 */

import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';

import { environment } from './../../../../../environments/environment';

@Injectable()
export class AuthenticationService {
  public authUrl = environment.authenticationServiceUrl;
  public crudUrl = environment.crudServiceUrl;

  constructor(
    private _http: Http,
    private _router: Router,
    public _snackbar: MatSnackBar
  ) { }

  login = (params) => new Promise((resolve, reject) => {
    //Set params errors: start
    if(!params) {
      resolve({
        code: 'l-error-01',
        message: 'Defina parâmetros mínimos'
      })
    } else {
      if(!params.user) {
        resolve({
          code: 'l-error-02',
          message: 'Parâmetro obrigatório: user'
        })
      }
  
      if(!params.password) {
        resolve({
          code: 'l-error-03',
          message: 'Parâmetro obrigatório: password'
        })
      }

      if(!params.loginMode) {
        resolve({
          code: 'l-error-04',
          message: 'Parâmetro obrigatório: loginMode'
        })
      }

      if(!params.navigateTo) {
        resolve({
          code: 'l-error-05',
          message: 'Parâmetro obrigatório: navigateTo'
        })
      }
    }
    //Set params errors: end

    if(params.loginMode === "emailAndPassword") {
      this._http
      .post(
        this.authUrl+"/Users/login",
        {
          email: params.user,
          password: params.password
        },
      ).subscribe(res => {
        if(res && res['ok']) {
          sessionStorage.setItem('user', JSON.stringify(res));

          this._router.navigate([params.navigateTo]);
          
          this._snackbar.open('Login feito com sucesso','',{
            duration: 4000
          })
        }
      }, rej => {
        this._snackbar.open('Login mal sucedido','',{
          duration: 4000
        })
        reject(rej);
      })
    }
  });

  logout = (params) => {
    let userData = JSON.parse(JSON.parse(sessionStorage.user)._body);
    this._http.post(this.authUrl + '/Users/logout?access_token=' + userData.id, '');
    sessionStorage.clear();
    this._router.navigate(['/login']);
  }

  setUser = () => new Promise((resolve, reject) => {
    resolve({ id: JSON.parse(JSON.parse(sessionStorage.user)._body).id});
  })
}
