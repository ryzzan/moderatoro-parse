import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef, MatSnackBar } from '@angular/material';

/**
 * Services
 */
import { CrudService } from '../../services/parse/crud.service';
import { ObjectService } from '../../services/object.service';

@Component({
  selector: 'app-form-creator',
  templateUrl: './form-creator.component.html',
  styleUrls: ['./form-creator.component.css']
})
export class FormCreatorComponent implements OnInit {
  checkValues: any;
  formCreatorForm: FormGroup;
  objectToCreateForm: any;
  options: any;
  optionsOrigin: string;
  title: String;
  valid: Boolean;

  constructor(
    public _crud: CrudService,
    private _object: ObjectService,
    public dialogRef: MatDialogRef<FormCreatorComponent>,
    public snackbar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
  }

  ngOnInit() {
    this.objectToCreateForm = {
      component: null,
      formStructure: []
    };
    this.options = {
      type: null,
      values: []
    };
    this.valid = true;

    this.formCreatorForm = new FormGroup({
      component: new FormControl(null),
      formControlName: new FormControl(null),
      placeholder: new FormControl(null),
      optionsFilling: new FormControl(null),
      optionsByParse: new FormControl(null),
      type: new FormControl(null),
    });
    this.title = 'Form creator';

    if (this.data) {
      if (this.data.title) {
        this.title = this.data.title;
      }

      if (this.data.objectToCreateForm) {
        this.objectToCreateForm = this.data.objectToCreateForm;
      }
    }
  }

  checkElementsFormControlNamesExistence = (value) => {
    clearTimeout(this.checkValues);

    this.checkValues = setTimeout(() => {
      this._object.checkExistenceOfAttributeValue(
        this.objectToCreateForm,
        this.formCreatorForm.value.formControlName,
        value
      )
      .catch(rej => {
        this.valid = false;
        this.formCreatorForm.get('formControlName').hasError('Já existe este formControlName no objeto');
        this.snackbar.open('Já existe este formControlName no objeto', '', {
          duration: 4000
        });
      })
      .then(res => {
        this.valid = true;
      });
    }, 600);
  }

  optionsAdd = () => new Promise((resolve, reject) => {
    if (
      this.formCreatorForm.value.optionsFilling
      && this.formCreatorForm.value.formControlName
      && this.formCreatorForm.value.placeholder
    ) {
      this.options['values'].push(this.formCreatorForm.value.optionsFilling);
      this.options['type'] = 'fill';

      this.formCreatorForm.get('optionsFilling').patchValue(null);

      resolve(this.options);
    } else if (
      this.formCreatorForm.value.optionsByParse
      && this.formCreatorForm.value.formControlName
      && this.formCreatorForm.value.placeholder
    ) {
      const optionsArray = {
        values: [],
        type: ''
      };
      let options;
      options = this.formCreatorForm.value.optionsByParse.split(',');
      this._crud.readFromRoute({
        route: options[0]
      })
      .catch(rej => {
        console.log(rej);
      })
      .then(res => {
        for (let i = 0; i < res['response'].length; i++) {
          const element = res['response'][i]['attributes'][options[1]];
          optionsArray['values'].push(element);
        }

        optionsArray['type'] = 'fill';

        this.formCreatorForm.get('optionsByParse').patchValue(null);

        resolve(optionsArray);
      });
    } else {
      resolve(true);
    }
  })

  editPlaceholderSuggestion = (value) => {
    clearTimeout(this.checkValues);

    this.checkValues = setTimeout(() => {
      if (!this.formCreatorForm.get('placeholder').value || this.formCreatorForm.get('placeholder').value !== '') {
        for (let i = 0; i < value.length; i++) {
          const element = value[i];
          if (element.match(/[A-Z0-9]/)) {
          }
        }
        const splits = value.replace(/[A-Z0-9]/, ' ');
        console.log(splits);
      }
    }, 400);
  }

  editTitleSuggestion = () => {
    let temp, title;
    title = '';
    temp = this.objectToCreateForm.component.split('_');

    for (let i = 0; i < temp.length; i++) {
      title += temp[i].toUpperCase() + ' ';
    }
    console.log(title);
    this.objectToCreateForm.title = title;
  }

  onFormCreatorSubmit = () => {
    this.optionsOrigin = null;
    if (this.formCreatorForm.value.component) {
      this.objectToCreateForm['component'] = this.formCreatorForm.get('component').value;
      this.editTitleSuggestion();
    }

    this.optionsAdd()
    .then(res => {
      console.log(this.formCreatorForm);
      if (this.formCreatorForm.value.type) {
        this.objectToCreateForm['formStructure'].push({
          type: this.formCreatorForm.value.type,
          formControlName: this.formCreatorForm.value.formControlName,
          placeholder: this.formCreatorForm.value.placeholder,
          options: res
        });
      }

      this.options = {
        type: null,
        values: []
      };

      this.formCreatorForm.reset();
    });
  }
}
