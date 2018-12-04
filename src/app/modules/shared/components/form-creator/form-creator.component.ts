import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef, MatSnackBar } from '@angular/material';

/**
 * Services
 */
import { CrudService } from '../../services/parse/crud.service';
import { ObjectService } from '../../services/object.service';
import { StringService } from '../../services/string.service';

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
    private _string: StringService,
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

  checkElementsFormControlNamesExistence = () => new Promise((resolve, reject) => {
    this._object.checkExistenceOfAttributeValue(
      this.objectToCreateForm.formStructure,
      'formControlName',
      this.formCreatorForm.get('formControlName').value
    )
    .then(res => {
      resolve(res);
    });
  })

  optionsAdd = () => new Promise((resolve, reject) => {
    if (
      this.formCreatorForm.value.optionsFilling
      && this.formCreatorForm.value.formControlName
      && this.formCreatorForm.value.placeholder
    ) {
      this.options['values'].push(this.formCreatorForm.value.optionsFilling);
      this.options['type'] = 'fill';

      this.formCreatorForm.get('optionsFilling').patchValue(null);
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
      if (this.options.values.length > 0) {
        resolve(this.options);
      } else {
        resolve(true);
      }
    }

  })

  editPlaceholderSuggestion = (value) => {
    if (
      !this.formCreatorForm.get('placeholder').value
      || this.formCreatorForm.get('placeholder').value === ''
    ) {
      this._string.transformCamelCaseOrUnderlinedString(value, 'first')
      .then(res => {
        this.formCreatorForm.get('placeholder').setValue(res);
      });
    }
  }

  editTitleSuggestion = () => {
    this._string.transformCamelCaseOrUnderlinedString(this.formCreatorForm.get('component').value, 'camel')
    .then(res => {
      this.objectToCreateForm.title = res;
    });
  }

  onFormCreatorSubmit = () => {
    this.optionsOrigin = null;
    if (this.formCreatorForm.value.component) {
      this.objectToCreateForm['component'] = this.formCreatorForm.get('component').value;
      this.editTitleSuggestion();
    }

    this.checkElementsFormControlNamesExistence()
    .then(res => {
      if (res['attributeValueExists']) {
        this.valid = false;
        this.formCreatorForm.get('formControlName').hasError('Já existe este formControlName no objeto');
        this.snackbar.open('Já existe este formControlName no objeto', '', {
          duration: 4000
        });

        this.options = {
          type: null,
          values: []
        };

        this.formCreatorForm.reset();

        return false;
      }

      this.optionsAdd()
      .then(resolve => {
        if (this.formCreatorForm.value.type) {
          this.objectToCreateForm['formStructure'].push({
            type: this.formCreatorForm.value.type,
            formControlName: this.formCreatorForm.value.formControlName,
            placeholder: this.formCreatorForm.value.placeholder,
            options: resolve
          });
        }

        this.options = {
          type: null,
          values: []
        };

        this.formCreatorForm.reset();
      });
    });

    console.log(this.objectToCreateForm);
  }
}
