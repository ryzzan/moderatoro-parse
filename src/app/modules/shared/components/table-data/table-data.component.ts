/**
 * Deals with a list component.
 * @param {Object} params
 * @param {Object} params.toolbar
 * @param {string} params.toolbar.title - gives a title to toolbar
 * @param {Object} params.toolbar.delete - ignites delete area on toolbar, list and its methods
 * @param {string} params.toolbar.delete.routeAfterDelete
 * @param {string} params.toolbar.delete.routeToApi
 * @param {string} params.toolbar.delete.fieldToDelete
 * @param {string} params.toolbar.delete.message
 * @param {string} params.toolbar.delete.exception[]
 * @param {Object} params.toolbar.search - ignites search area on toolbar and its methods
 * @param {string} params.toolbar.search.type - advanced or default (not necessary to explicit)
 * @param {string} params.toolbar.search.fields[] - if type advanced
 * @param {Object} params.toolbar.actionButton
 * @param {string} params.toolbar.actionButton.permissions
 * @param {string} params.toolbar.actionButton.type
 * @param {string} params.toolbar.actionButton.value
 * @param {string} params.toolbar.actionButton.color
 * @param {Object} params.list
 * @param {Object[]} params.list.columns
 * @param {string} params.list.columns.columnDef
 * @param {string} params.list.columns.header
 * @param {any} params.list.columns.cell - (row: User) => `${row.uf == null ? '' : row.uf}`
 * @param {Array} params.list.show
 * @param {Array} params.list.header
 * @param {Array} params.list.order
 * @param {Object} params.list.edit
 * @param {string} params.list.edit.route
 * @param {string} params.list.edit.param
 * @param {number} params.list.page
 * @param {Object[]} params.list.changeValue
 * @param {string} params.list.changeValue.field
 * @param {string} params.list.changeValue.fieldValue
 * @param {string} params.list.changeValue.newValue
 * @param {Object[]} params.list.changeValueReadingDB
 * @param {string} params.list.changeValueReadingDB.collecimport { read } from 'fs';
tion
 * @param {string} params.list.changeValueReadingDB.field
 * @param {Object} params.list.actionButton
 */
import {
  Component,
  OnInit,
  Input,
  OnChanges,
  Output,
  EventEmitter
} from '@angular/core';
import {
  DeleteConfirmComponent
} from './../delete-confirm/delete-confirm.component';
import {
  FormGroup,
  FormControl,
  Validators
} from '@angular/forms';
import {
  MatSnackBar,
  MatDialog
} from '@angular/material';
import {
  Router
} from '@angular/router';

/**
 * Services
 */
import {
  CrudService
} from './../../services/parse/crud.service';

@Component({
  selector: 'app-table-data',
  templateUrl: './table-data.component.html',
  styleUrls: ['./table-data.component.css']
})
export class TableDataComponent implements OnInit, OnChanges {
  @Input() params: any;

  listEdit: boolean;
  title: string;
  toolbarActionButton: boolean;
  toolbarDelete: boolean;

  constructor(
    private _crud: CrudService
  ) {
  }

  ngOnChanges() {
    this._crud.readFromRoute(this.params);
  }

  ngOnInit() {
    this._crud.readFromRoute(this.params);
    // this.params.list ? this.setListContent() : this.setErrors('params.list is required');
    // (this.params.list && this.params.list.edit) ? this.setListEdit() : this.listEdit = false;
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
