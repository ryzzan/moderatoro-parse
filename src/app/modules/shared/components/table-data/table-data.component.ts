import { Component, OnInit, Input, Output, EventEmitter, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';

/**
 * Services
 */
import { CrudService } from '../../services/parse/crud.service';
import { Response } from 'selenium-webdriver/http';

@Component({
  selector: 'app-table-data',
  templateUrl: './table-data.component.html',
  styleUrls: ['./table-data.component.css']
})
export class TableDataComponent implements OnInit {
  @Input() params: any;
  @Output() tableDataOutput = new EventEmitter();

  actionbarQuantity: boolean;
  columns: any;
  currentPage: number;
  deleteArray: any;
  headers: any;
  isLoading: boolean;
  listActionButton: boolean;
  pages: number;
  pagination: boolean;
  qtSelected: number;
  title: string;
  toolbarActionButton: boolean;
  toolbarDelete: boolean;
  total: number;

  constructor(
    private _crud: CrudService
  ) {
  }

  ngOnInit() {
    this.currentPage = 1;
    this.headers = [];
    this.isLoading = true;
    this.pagination = false;

    this.params.list.actionButton ? this.setListActionButton() : this.listActionButton = false;
    (this.params.toolbar && this.params.toolbar.title) ? this.title = this.params.toolbar.title : this.title = '';
    (this.params.toolbar && this.params.toolbar.actionButton) ? this.setToolbarActionButton() : this.toolbarActionButton = false;
    (this.params.toolbar && this.params.toolbar.delete) ? this.setToolbarDelete() : this.toolbarDelete = false;
    (this.params.actionbar && this.params.actionbar.quantity) ? this.setActionbarQuantity() : this.actionbarQuantity = false;
    this.params.list ? this.setListContent() : this.setErrors('params.list is required');
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
    this.headers = [];

    if (this.params.list.route) {
      this.setListContentByParseRoute();

      this.isLoading = false;
    } else {
      if (this.params.list.object) {
        this.setListContentByObject();
      } else {
        this.setErrors('params.list.route is required');
      }

      this.isLoading = false;
    }

    if (!this.total) { console.log(76);
      this._crud.countFromRoute({
        route: this.params.list.route
      }).then(res => {
        this.total = res['response'];
      });
    }
  }

  setListContentByParseRoute = () => {
    let limit, skip;
    this.pagination ? skip = (this.currentPage - 1) * this.qtSelected : skip = undefined;
    this.qtSelected ? limit = this.qtSelected : limit = undefined;

    this._crud.readFromRoute({
      route: this.params.list.route,
      limit: limit,
      skip: skip
    }).then(res => {
      for (let lim = this.params['list']['columns'].length, i = 0; i < lim; i++) {
        this.headers.push(this.params['list']['columns'][i]['header']);
      }

      this.columns = res['response'];
    });
  }

  setListContentByObject = () => {
  }

  setListActionButton = () => {
    this.listActionButton = true;
  }

  setActionbarQuantity = () => {
    this.qtSelected = this.params.actionbar.quantity;
  }

  setCheckAllToDelete = () => {

  }

  setErrors = (msg: string) => {
    return msg;
  }

  setPagination = () => {
    this.pages = Math.round(this.total / this.qtSelected);
  }

  onChangeQuantity = (e) => {
    this.qtSelected = e.value;
    this.setListContent();

    if (this.total > this.qtSelected) {
      this.setPagination();
      this.pagination = true;
    } else {
      this.pagination = false;
    }
  }

  onChangePage = (property) => {
    property === 'add' ? this.currentPage ++ : this.currentPage --;

    this.setListContent();
  }

  onClickCheckboxToDelete = (e, rowObject) => {
    if (rowObject.all) {
      this.setCheckAllToDelete();
    } else {
      e.checked ? this.deleteArray.push(rowObject.id) : this.deleteArray.remove(); // aqui
    }
  }

  onClickToolbarActionButton = (trigger) => {
    this.tableDataOutput.emit({trigger: trigger});
  }

  onClickListActionButton = (trigger, rowObject) => {
    this.tableDataOutput.emit({
      trigger: trigger,
      response: rowObject
    });
  }
}
