import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { MatSnackBar, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

/**
 * Services
 */
import { CrudService } from './../../../../shared/services/parse/crud.service';
import { AuthenticationService } from './../../../../shared/services/parse/authentication.service';
import { ValidateDateDMYHMSComparison } from 'src/app/modules/shared/validators/date-comparison.validator';

@Component({
  selector: 'app-period-dialog',
  templateUrl: './period-dialog.component.html',
  styleUrls: ['./period-dialog.component.css']
})
export class PeriodDialogComponent implements OnInit {
  array: any;
  competitionId: number;
  roles: any;
  title: string;
  userForm: FormGroup;
  /*update properties no change start*/
  paramToSearch: any;
  submitToCreate: boolean;
  submitToUpdate: boolean;
  submitButton: string;
  /*update properties no change end*/
  periodDialogForm: FormGroup;

  constructor(
    private _auth: AuthenticationService,
    private _crud: CrudService,
    private matsnackbar: MatSnackBar,
    public dialogRef: MatDialogRef<PeriodDialogComponent>,
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }

  ngOnInit() {

   this.periodDialogForm = this.fb.group({
      'periodGroup': this.fb.group({
        'name': [null, [Validators.maxLength(145), Validators.required]],
        dates: this.fb.group({
          'startDate': [null, [Validators.required]],
          'endDate': [null, Validators.required],
        }, { validator: ValidateDateDMYHMSComparison(
          '',
          '==',
          'Não são datas iguais'
        )})
      })
    });
    console.log(this.data);
    /*update start*/
    if (this.data && this.data.id) {
      this.paramToSearch = this.data.id;
      this.submitToCreate = false;
      this.submitToUpdate = true;
      this.title = 'Alterar ciclo';
      this.submitButton = 'Atualizar';

      this.periodDialogForm = this.fb.group({
        'periodGroup': this.fb.group({
          'name': [null, [Validators.maxLength(145), Validators.required]],
          'startDate': [null, [Validators.required,
          ValidateDateDMYHMSComparison(
            this.periodDialogForm.value.periodGroup.endDate,
            '==',
            'Não são datas iguais'
          )]],
          'endDate': [null, [Validators.required,
          ValidateDateDMYHMSComparison(
            this.periodDialogForm.value.periodGroup.startDate,
            '==',
            'Não são datas iguais'
          )]],
        })
      });

      this._crud.readFromRoute({
        route: 'Period',
        order: ['objectId', 'desc'],
        where: [{
          property: 'objectId',
          value: this.data.id
        }]
      }).then(res => {
        const obj = res['response'][0]['attributes'];

        this.periodDialogForm.patchValue({
          periodGroup: {
            name: obj.name,
            startDate: obj.startDate,
            endDate: obj.endDate,
          }
        });
      }, err => {
        this._auth.handleParseError(err, '');
      });
    } else {
      console.log(this.periodDialogForm);
      // @ts-ignore
      // this.periodDialogForm.controls.periodGroup.controls.dates.controls.startDate.setValidators(ValidateDateDMYHMSComparison(
      //             this.periodDialogForm.controls,
      //             '==',
      //             'Não são datas iguais'
      //           ));
      // this.periodDialogForm = this.fb.group({
      //   'periodGroup': this.fb.group({
      //     'name': [null, [Validators.maxLength(145), Validators.required]],
      //     dates: this.fb.group({
      //       'startDate': [null, [Validators.required, ValidateDateDMYHMSComparison(
      //           this.periodDialogForm.controls,
      //           '==',
      //           'Não são datas iguais'
      //         )]],
      //       'endDate': [null, Validators.required],
      //     })
      //     // 'startDate': [null, [Validators.required,
      //     // ValidateDateDMYHMSComparison(
      //     //   this.periodDialogForm.controls,
      //     //   '==',
      //     //   'Não são datas iguais'
      //     // )]],
      //     // 'endDate': [null, [Validators.required,
      //     // ValidateDateDMYHMSComparison(
      //     //   this.periodDialogForm.value.periodGroup.startDate,
      //     //   '==',
      //     //   'Não são datas iguais'
      //     // )
      //   ]],
      //   })
      // });

      this.submitToCreate = true;
      this.submitToUpdate = false;
      this.title = 'Cadastrar ciclo';
      this.submitButton = 'Salvar';
    }
    /*update end*/
  }

  onPeriodDialogSubmit = () => {
    if (this.submitToUpdate) {
      const params = {
        route: 'Period',
        objectToUpdate: this.periodDialogForm.value.periodGroup,
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
            message: 'PeriodDialogForm was updated'
          });
        }, err => {
          this._auth.handleParseError(err, '');
        });
    } else {
      const paramsToPeriod = {
        route: 'Period',
        objectToCreate: this.periodDialogForm.value.periodGroup
      };
      this._crud.create(paramsToPeriod)
        .then(res => {
          this.matsnackbar.open(res['message'], '', {
            duration: 2000
          });

          this.dialogRef.close({
            response: 'created',
            message: 'PeriodDialogForm created new data'
          });
        }, err => {
          this._auth.handleParseError(err, '');
        });
    }
  }
}
