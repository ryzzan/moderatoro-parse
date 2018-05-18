import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { CrudService } from '../../../shared/services/loopback/crud.service';

@Component({
  selector: 'app-rule',
  templateUrl: './rule.component.html',
  styleUrls: ['./rule.component.css']
})
export class RuleComponent implements OnInit {
  ruleForm: FormGroup;
  constructor(private _crud: CrudService) {
    this.ruleForm = new FormGroup({
      description: new FormControl(null)
    });
  }

  ngOnInit() {
  }

  onSubmitRule = () => {
    this._crud.create({
      route: 'Rules',
      objectToCreate: this.ruleForm.value
    })
  }

}
