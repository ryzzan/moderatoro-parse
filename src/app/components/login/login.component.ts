import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';

/**
 * Services
 */
import { AuthenticationService } from './../../modules/shared/services/parse/authentication.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public disabled: boolean;

  public loginForm: FormGroup;

  constructor(
    private _auth: AuthenticationService,
    public _snackbar: MatSnackBar
  ) { }

  ngOnInit() {
    this.disabled = false;

    this.loginForm = new FormGroup({
      user: new FormControl(null),
      password: new FormControl(null)
    });
  }

  onLoginSubmit = () => {
    this.disabled = true;
    const params = {
      user: this.loginForm.get('user').value,
      password: this.loginForm.get('password').value,
      loginMode: 'emailAndPassword',
      navigateTo: '/main'
    };

    this._auth
    .login(params)
    .then(res => {
      setTimeout(() => {
        this.disabled = false;
      }, 3000);
    }).catch( rej => {
      setTimeout(() => {
        this.disabled = false;
      }, 3000);
    });
  }
}
