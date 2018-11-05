import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

/**
 * Services
 */
import { ObjectService } from '../../services/object.service';

@Component({
  selector: 'app-search-dialog',
  templateUrl: './search-dialog.component.html',
  styleUrls: ['./search-dialog.component.css']
})

export class SearchDialogComponent implements OnInit {
  public columns: any;
  private searchInterface: any = {
    header: String,
    attribute: String
  };

  constructor(
    private _dialog: MatDialogRef<SearchDialogComponent>,
    private _object: ObjectService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit() {
    this.setSearchForm();
  }
  
  setSearchForm = () => {    
    this._object.checkInterface(this.data.name, this.searchInterface)
    .catch(res => console.log(res))
    .then(res => {
      this.columns = this.data.name;
    });
  }
}
