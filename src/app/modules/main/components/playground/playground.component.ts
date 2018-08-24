import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormGroupDirective } from '@angular/forms';

/**
 * Services
 */
import { AuthenticationService } from './../../../shared/services/parse/authentication.service';
import { CrudService } from './../../../shared/services/parse/crud.service';

@Component({
  selector: 'app-playground',
  templateUrl: './playground.component.html',
  styleUrls: ['./playground.component.css']
})
export class PlaygroundComponent implements OnInit {
  public paramsToTableData: any;
  public playgroundForm: FormGroup;
  public tableDataError: any;
  constructor(
    private _auth: AuthenticationService,
    private _crud: CrudService
  ) { }

  ngOnInit() {
    this.playgroundForm = new FormGroup({
      'weight': new FormControl(null),
      'height': new FormControl(null),
      'age': new FormControl(null),
      'biologicalSex': new FormControl(null)
    })
  }

  clearForm = (playgroundFormDirective: FormGroupDirective) => {    
    playgroundFormDirective.reset();
    playgroundFormDirective.resetForm();
  }

  onPlaygroundFormSubmit = () => {
    let imc = this.playgroundForm.value.weight / (this.playgroundForm.value.height*this.playgroundForm.value.height);
    if(imc < 18.5) {
      console.log("Você é quase uma ameba")
    }
    
    if((imc > 18.5) && (imc < 24.9)) {
      console.log("Você tá de boa")
    }

    if((imc > 24.9) && (imc < 29.9)) {
      console.log("Gordinho gostoso")
    }

    if(imc > 30) {
      console.log("Você é uma porca gorda")
    }
    // this._crud
    // .create({
    //   route: 'Companies',
    //   objectToCreate: this.playgroundForm.value
    // })
  }
}
