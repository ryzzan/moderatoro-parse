import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { MatSnackBar, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

/**
 * Services
 */
import { CrudService } from './../../../../shared/services/parse/crud.service';
import { AuthenticationService } from './../../../../shared/services/parse/authentication.service';

@Component({
  selector: 'app-area-dialog',
  templateUrl: './area-dialog.component.html',
  styleUrls: ['./area-dialog.component.css']
})
export class AreaDialogComponent implements OnInit {
  array: any;
  competitionId: number;
  areaDialogForm: FormGroup;
  roles: any;
  title: string;
  userForm: FormGroup;
  /*update properties no change start*/
  paramToSearch: any;
  submitToCreate: boolean;
  submitToUpdate: boolean;
  submitButton: string;
  /*update properties no change end*/

  constructor(
    private _auth: AuthenticationService,
    private _crud: CrudService,
    private matsnackbar: MatSnackBar,
    public dialogRef: MatDialogRef<AreaDialogComponent>,
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }

  ngOnInit() {
    this.areaDialogForm = this.fb.group({
      'areaGroup': this.fb.group({
        'name': [null, [Validators.maxLength(145), Validators.required]]
      })
    });

    /*update start*/
    if (this.data && this.data.id) {
      this.paramToSearch = this.data.id;
      this.submitToCreate = false;
      this.submitToUpdate = true;
      this.title = 'Alterar área';
      this.submitButton = 'Atualizar';

      this._crud.readFromRoute({
        route: 'Area',
        order: ['objectId', 'desc'],
        where: [{
          property: 'objectId',
          value: this.data.id
        }]
      }).then(res => {
        const obj = res['response'][0]['attributes'];

        this.areaDialogForm.patchValue({
          areaGroup: {
            name: obj.name
          }
        });
      }, err => {
        this._auth.handleParseError(err, '');
      });
    } else {
      this.submitToCreate = true;
      this.submitToUpdate = false;
      this.title = 'Cadastrar área';
      this.submitButton = 'Salvar';
    }
    /*update end*/
  }

  onAreaDialogSubmit = () => {
    if (this.submitToUpdate) {
      const params = {
        route: 'Area',
        objectToUpdate: this.areaDialogForm.value.areaGroup,
        where: {
          property: 'objectId',
          value: this.data.id
        }
      };

      this._crud.update(params)
        .then(res => {
          this.matsnackbar.open(res['message'], '', {
            duration: 2000
          });

          this.dialogRef.close({
            response: 'updated',
            message: 'AreaDialogForm was updated'
          });
        }, err => {
          this._auth.handleParseError(err, '');
        });
    } else {
      const paramsToArea = {
        route: 'Area',
        objectToCreate: this.areaDialogForm.value.areaGroup
      };
      this._crud.create(paramsToArea)
        .then(res => {
          this.matsnackbar.open(res['message'], '', {
            duration: 2000
          });

          this.dialogRef.close({
            response: 'created',
            message: 'AreaDialogForm created new data'
          });
        }, err => {
          this._auth.handleParseError(err, '');
        });
    }
  }
}
