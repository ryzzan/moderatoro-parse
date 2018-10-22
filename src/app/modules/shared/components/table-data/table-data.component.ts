import { Component, OnInit, Input, Output, EventEmitter, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';

/**
 * Services
 */
import { ArrayService } from '../../services/array.service';
import { CrudService } from '../../services/parse/crud.service';

@Component({
  selector: 'app-table-data',
  templateUrl: './table-data.component.html',
  styleUrls: ['./table-data.component.css']
})
export class TableDataComponent implements OnInit {
  @Input() params: any;
  @Output() tableDataOutput = new EventEmitter();

  actionbarQuantity = false;
  columns: any;
  currentPage: number = 1;
  deleteArray: Array<any> = [];
  headers: Array<any> = [];
  isLoading = true;
  listActionButton = false;
  pages: number;
  pagination = false;
  qtSelected: number;
  allAsChecked = false;
  title: string = '';
  toolbarActionButton = false;
  toolbarDelete = false;
  total: number;

  constructor(
    private _crud: CrudService,
    private _array: ArrayService
  ) {
  }

  ngOnInit() {
    if (this.params.list.actionButton) this.setListActionButton();
    if (this.params.toolbar && this.params.toolbar.title) this.title = this.params.toolbar.title;
    if (this.params.toolbar && this.params.toolbar.actionButton) this.setToolbarActionButton();
    if (this.params.toolbar && this.params.toolbar.delete) this.setToolbarDelete();
    if (this.params.actionbar && this.params.actionbar.quantity) this.setActionbarQuantity();
    this.params.list ? this.setListContent() : this.setErrors('params.list is required');
  }

  setToolbarDelete = () => {
    this.toolbarDelete = true;
  }

  setToolbarActionButton = () => {
    this.toolbarActionButton = true;
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

    if (!this.total) {
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
    this.deleteArray = [];
    this.allAsChecked = true;

    this.columns.forEach(element => {
      element._checked = true;
      this.deleteArray.push(element.id);
    });
  }

  setUncheckAllToDelete = () => {
    this.deleteArray = [];
    this.allAsChecked = false;

    this.columns.forEach(element => {
      element._checked = false;
    });
  }

  setErrors = (msg: string) => {
    return msg;
  }

  setPagination = () => {
    this.pages = Math.round(this.total / this.qtSelected);
  }

  onChangeQuantity = (e) => {
    this.allAsChecked = false;
    this.deleteArray = [];
    this.qtSelected = e.value;
    this.currentPage = 1;
    this.setUncheckAllToDelete();
    this.setListContent();
    if (this.total > this.qtSelected) {
      this.setPagination();
      this.pagination = true;
    } else {
      this.pagination = false;
    }
    console.log(this.columns);
  }

  onChangePage = (property) => {console.log(this.columns);
    this.allAsChecked = false;
    this.deleteArray = [];
    this.setListContent();
    this.setUncheckAllToDelete();
    property === 'add' ? this.currentPage ++ : this.currentPage --;
  }

  onClickCheckboxToDelete = (e, rowObject) => { 
    if (rowObject.all) {
      e.checked ? this.setCheckAllToDelete() : this.setUncheckAllToDelete();
    } else {
      rowObject._checked = e.checked;

      if (e.checked) {
        this.deleteArray.push(rowObject.id);
      } else {
        this._array.removeByValue(this.deleteArray, [rowObject.id]);
      }

      this.deleteArray.length === this.columns.length ? this.setCheckAllToDelete() : this.allAsChecked = false;
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
