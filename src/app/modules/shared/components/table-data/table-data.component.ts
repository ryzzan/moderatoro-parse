import { Component, OnInit, Input, Output, EventEmitter, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';

@Component({
  selector: 'app-table-data',
  templateUrl: './table-data.component.html',
  styleUrls: ['./table-data.component.css']
})
export class TableDataComponent implements OnInit {
  @Input() params: any;

  listEdit: boolean;
  title: string;
  toolbarActionButton: boolean;
  toolbarDelete: boolean;

  constructor(
  ) {
  }

  ngOnInit() {
    this._crud.readFromRoute(this.params)
    .then(res => {
      this.collumns = res['response'];
      console.log(this.collumns);
    });
    this.params.list ? this.setListContent() : this.setErrors('params.list is required');
    (this.params.list && this.params.list.edit) ? this.setListEdit() : this.listEdit = false;
    // (this.params.toolbar && this.params.toolbar.title) ? this.title = this.params.toolbar.title : this.title = '';
    // (this.params.toolbar && this.params.toolbar.actionButton) ? this.setToolbarActionButton() : this.toolbarActionButton = false;
    // (this.params.toolbar && this.params.toolbar.delete) ? this.setToolbarDelete() : this.toolbarDelete = false;
  }

  setToolbarDelete = () => {
    this.toolbarDelete = true;
  }

  setToolbarActionButton = () => {
    this.toolbarActionButton = true;
  }

  setListHeader = () => {
  }

  setListContent = () => {
  }

  setListEdit = () => {
    this.listEdit = true;
  }

  setListActionButton = () => {
  }

  setErrors = (msg: string) => {
    return msg;
  }
}
