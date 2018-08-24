import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';

/**
 * Services
 */
import { AuthenticationService } from './../services/parse/authentication.service';
import { MatSnackBar } from '@angular/material';

/**
 * @description Permission to navigate to any route IF there is an user loggedin ELSE force navigation to login route
 *    @extends _auth.setUser() - AuthenticationService method
 *        @returns user object with its id IF there is an user loggedin ELSE false
 *    @extends _auth.router - Router
 *        @returns navigate to login IF there is no user loggedin ELSE user will be allowed to navigate to any route under auth.guard
 */

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private _auth: AuthenticationService,
    private _router: Router,
    public _snackbar: MatSnackBar
  ) {}

  canActivate(
    next: ActivatedRouteSnapshot, state:
    RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean
  {
    // this._auth.setUser()
    // .catch(error => {
    //   this._router.navigate(['/login']);
    // })
    // .then(res => { console.log(res)
    //   if(!res['id']) {
    //     this._router.navigate(['/login']);
    //   }
    // }).catch( rej => {
    //   this._snackbar.open('Você precisa estar logado para acessar essa área','',{
    //     duration: 4000
    //   })
    // });

    return true;
  }
}
