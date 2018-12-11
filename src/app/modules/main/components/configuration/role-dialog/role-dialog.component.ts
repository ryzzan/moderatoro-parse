import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { MatSnackBar, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

/**
 * Services
 */
import { CrudService } from './../../../../shared/services/parse/crud.service';
import { AuthenticationService } from './../../../../shared/services/parse/authentication.service';

@Component({
  selector: 'app-role-dialog',
  templateUrl: './role-dialog.component.html',
  styleUrls: ['./role-dialog.component.css']
})
export class RoleDialogComponent implements OnInit {
  array: any;
  competitionId: number;
  roleDialogForm: FormGroup;
  roles: any;
  title: string;
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
    public dialogRef: MatDialogRef<RoleDialogComponent>,
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }

  ngOnInit() {
    this.roleDialogForm = this.fb.group({
      'roleGroup': this.fb.group({
        'name': [null, [Validators.maxLength(145), Validators.required]],
        'acl': [null, [Validators.required]],
      })
    });

    /*update start*/
    if (this.data && this.data.id) {
      this.paramToSearch = this.data.id;
      this.submitToCreate = false;
      this.submitToUpdate = true;
      this.title = 'Alterar perfil';
      this.submitButton = 'Atualizar';

      this._crud.readFromRoute({
        route: 'Role',
        order: ['objectId', 'desc'],
        where: [{
          property: 'objectId',
          value: this.data.id
        }]
      }).then(res => {
        const obj = res['response'][0]['attributes'];

        this.roleDialogForm.patchValue({
          roleGroup: {
            name: obj.name,
            acl: obj.acl
          }
        });
      }, err => {
        this._auth.handleParseError(err, '');
      });
    } else {
      this.submitToCreate = true;
      this.submitToUpdate = false;
      this.title = 'Cadastrar perfil';
      this.submitButton = 'Salvar';
    }
    /*update end*/
  }

  onRoleDialogSubmit = () => {
    if (this.submitToUpdate) {
      const params = {
        route: 'Role',
        objectToUpdate: this.roleDialogForm.value.roleGroup,
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
            message: 'RoleDialogForm was updated'
          });
        }, err => {
          this._auth.handleParseError(err, '');
        });
    } else {
      const paramsToRole = {
        objectToRole: this.roleDialogForm.value.roleGroup
      };
      this._crud.createRole(paramsToRole)
        .then(res => {
          console.log(res);
          // this.matsnackbar.open(res['message'], '', {
          //   duration: 2000
          // });

          // this.dialogRef.close({
          //   response: 'created',
          //   message: 'RoleDialogForm created new data'
          // });
        }, err => {
          console.log(err);
          this._auth.handleParseError(err, '');
        });
    }
  }
}
