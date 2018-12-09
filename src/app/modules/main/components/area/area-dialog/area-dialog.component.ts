import { Component, OnInit, Inject } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';

/**
 * Services
 */
import { CrudService } from './../../../../shared/services/parse/crud.service';

@Component({
  selector: 'app-area-dialog',
  templateUrl: './area-dialog.component.html',
  styleUrls: ['./area-dialog.component.css']
})
export class AreaDialogComponent implements OnInit {
  array: any;
  competitionId: number;
  areaDialogForm: FormGroup;
  paramsToTableData: any;
  title: string;
  /*update properties no change start*/
  paramToSearch: any;
  submitToCreate: boolean;
  submitToUpdate: boolean;
  submitButton: string;
  /*update properties no change end*/

  constructor(
    private route: ActivatedRoute,
    private crud: CrudService,
    private matsnackbar: MatSnackBar,
    private router: Router,
    public dialogRef: MatDialogRef<AreaDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }

  ngOnInit() {
    this.areaDialogForm = new FormGroup({
      'name': new FormControl(null, [Validators.maxLength(145), Validators.required])
    });
    /*update start*/

    if (this.data && this.data.id) {
      this.paramToSearch = this.data.id;
      this.submitToCreate = false;
      this.submitToUpdate = true;
      this.title = 'Alterar Área';
      this.submitButton = 'Atualizar';

      this.crud.readFromRoute({
        route: 'Area',
        order: ['objectId', 'desc'],
        where: [{
          property: 'objectId',
          value: this.data.id
        }]
      }).then(res => {
        const obj = res['response'][0]['attributes'];

        this.areaDialogForm.get('name').setValue(obj.name);
      });
    } else {
      this.submitToCreate = true;
      this.submitToUpdate = false;
      this.title = 'Cadastrar Área';
      this.submitButton = 'Salvar';
    }
    /*update end*/
  }

  onAreaDialogSubmit = () => {
    if (this.submitToUpdate) {
      const params = {
        route: 'Area',
        objectToUpdate: this.areaDialogForm.value,
        where: {
          property: 'objectId',
          value: this.data.id
        }
      };

      this.crud.update(params)
        .then(res => {
          console.log(res);
          this.matsnackbar.open(res['message'], '', {
            duration: 2000
          });

          this.dialogRef.close({
            response: 'updated',
            message: 'AreaDialogForm was updated'
          });
        }, rej => {
          this.matsnackbar.open(rej['message'], '', {
            duration: 3000
          });
        });
    } else {
      const params = {
        route: 'Area',
        objectToCreate: this.areaDialogForm.value
      };

      this.crud.create(params)
        .then(res => {
          this.matsnackbar.open(res['message'], '', {
            duration: 2000
          });

          this.dialogRef.close({
            response: 'created',
            message: 'AreaDialogForm created new data'
          });
        }, rej => {
          this.matsnackbar.open(rej['message'], '', {
            duration: 3000
          });
        });
    }
  }
}
