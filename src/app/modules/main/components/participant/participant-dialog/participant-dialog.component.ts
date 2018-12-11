import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { MatSnackBar, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

/**
 * Services
 */
import { AuthenticationService } from './../../../../shared/services/parse/authentication.service';
import { CrudService } from './../../../../shared/services/parse/crud.service';

/**
 * Validators
 */
import { ValidateCpf } from 'src/app/modules/shared/validators/cpf.validator';

@Component({
  selector: 'app-participant-dialog',
  templateUrl: './participant-dialog.component.html',
  styleUrls: ['./participant-dialog.component.css']
})
export class ParticipantDialogComponent implements OnInit {
  array: any;
  competitionId: number;
  participantDialogForm: FormGroup;
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
    public dialogRef: MatDialogRef<ParticipantDialogComponent>,
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }

  ngOnInit() {
    this.participantDialogForm = this.fb.group({
      'participantGroup': this.fb.group({
        'name': [null, [Validators.maxLength(145), Validators.required]],
        'cpf': [null, [ValidateCpf]],
        'rg': [null, [Validators.required]],
        'mobile': [null, [Validators.required]],
        'role': [null, [Validators.required]],
      }),
      'userGroup': this.fb.group({
        'email': [null, [Validators.email, Validators.required]],
        'password': [null, [Validators.required]],
      })
    });

    /*update start*/
    if (this.data && this.data.id) {
      this.paramToSearch = this.data.id;
      this.submitToCreate = false;
      this.submitToUpdate = true;
      this.title = 'Alterar Participante';
      this.submitButton = 'Atualizar';

      this._crud.readFromRoute({
        route: 'Participant',
        order: ['objectId', 'desc'],
        where: [{
          property: 'objectId',
          value: this.data.id
        }]
      }).then(res => {
        const obj = res['response'][0]['attributes'];

        this.participantDialogForm.get('name').setValue(obj.name);
      }, err => {
        this._auth.handleParseError(err, '');
      });
    } else {
      this.submitToCreate = true;
      this.submitToUpdate = false;
      this.title = 'Cadastrar Participante';
      this.submitButton = 'Salvar';
    }
    /*update end*/

    this._crud.readFromRoute({
      route: 'Role',
      order: ['objectId', 'desc']
    }).then(res => {
      this.roles = res['response'][0]['attributes'];
    }, err => {
      this._auth.handleParseError(err, '');
    });
  }

  onParticipantDialogSubmit = () => {
    if (this.submitToUpdate) {
      const params = {
        route: 'Participant',
        objectToUpdate: this.participantDialogForm.value,
        where: {
          property: 'objectId',
          value: this.data.id
        }
      };

      this._crud.update(params)
        .then(res => {
          console.log(res);
          this.matsnackbar.open(res['message'], '', {
            duration: 2000
          });

          this.dialogRef.close({
            response: 'updated',
            message: 'ParticipantDialogForm was updated'
          });
        }, err => {
          this._auth.handleParseError(err, '');
        });
    } else {
      console.log(this.participantDialogForm.value);
      const paramsToUser = {
        route: 'User',
        objectToCreateUser: this.participantDialogForm.value.userGroup
      };

      const paramsToParticipant = {
        route: 'Participant',
        objectToCreateUser: this.participantDialogForm.value.participantGroup
      };
      console.log(paramsToParticipant);
      // this._crud.create(paramsToUser)
      //   .then(res => {
      //     this.matsnackbar.open(res['message'], '', {
      //       duration: 2000
      //     });

      //     this.dialogRef.close({
      //       response: 'created',
      //       message: 'ParticipantDialogForm created new data'
      //     });
      //   }, err => {
      //     this._auth.handleParseError(err, '');
      //   });
    }
  }
}
