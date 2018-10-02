import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormGroupDirective } from '@angular/forms';

/**
 * Services
 */
import { AuthenticationService } from './../../../shared/services/parse/authentication.service';
import { CrudService } from './../../../shared/services/parse/crud.service';

/**
 * Validators
 */
import { ValidateRequired } from './../../../shared/validators/required.validator';

@Component({
  selector: 'app-playground',
  templateUrl: './playground.component.html',
  styleUrls: ['./playground.component.css']
})
export class PlaygroundComponent implements OnInit {
  public params: any;
  constructor(
    private _auth: AuthenticationService,
    private _crud: CrudService
  ) { }

  ngOnInit() {
    this.params = {
      list: {
        route: 'Form',
        columns: [{
          collumnDef: 'type',
          header: 'Tipo'
        }]
      }
    };
  }

  clearForm = (playgroundFormDirective: FormGroupDirective) => {
    playgroundFormDirective.reset();
    playgroundFormDirective.resetForm();
  }
}
