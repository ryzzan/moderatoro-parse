import { Component, OnInit, Input, Output, EventEmitter, Inject, OnChanges } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';

/**
 * Services
 */
import { ArrayService } from '../../services/array.service';
import { CrudService } from '../../services/parse/crud.service';
import { SearchDialogComponent } from '../search-dialog/search-dialog.component';

@Component({
  selector: 'app-table-data',
  templateUrl: './table-data.component.html',
  styleUrls: ['./table-data.component.css']
})
export class TableDataComponent implements OnInit, OnChanges {
  @Input() params: any;
  @Output() tableDataOutput = new EventEmitter();

  actionbarQuantity = false;
  allAsChecked = false;
  columns: any;
  currentPage = 1;
  delete: any;
  deleteArray: Array<any> = [];
  headers: Array<any> = [];
  isLoading = true;
  listActionButton = false;
  listActionButtonCondition = '';
  pages: number;
  pagination = false;
  qtSelected: number;
  search: any;
  searchResponse: any;
  searchString: string;
  title = '';
  toolbarActionButton = false;
  toolbarDelete = false;
  total: number;

  constructor(
    private _array: ArrayService,
    private _crud: CrudService,
    private _dialog: MatDialog
  ) {
  }

  ngOnInit() { console.log(49);
    this.params.list ? this.setListContent() : this.setErrors('params.list is required');
  }

  ngOnChanges() {
    this.params.list ? this.setListContent() : this.setErrors('params.list is required');
  }

  checkPagination = () => {
    if (this.total > this.qtSelected) {
      this.setPagination();
      this.pagination = true;
    } else {
      this.pagination = false;
    }
  }

  setListStructure = () => {
    if (this.params.toolbar && this.params.toolbar.actionButton) { this.setToolbarActionButton(); }
    if (this.params.toolbar && this.params.toolbar.delete) { this.setToolbarDelete(); }
    if (this.params.actionbar && this.params.actionbar.quantity) { this.setActionbarQuantity(); }
    if (this.params.toolbar && this.params.toolbar.search) { this.search = this.params.toolbar.search; }
    if (this.params.toolbar && this.params.toolbar.title) { this.title = this.params.toolbar.title; }
    if (this.params.list.actionButton) { this.setListActionButton(); }
  }

  setToolbarDelete = () => {
    this.toolbarDelete = true;

    this.delete = this.params.toolbar.delete;
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
  }

  setListContentByParseRoute = () => {
    let group, limit, order, search, skip;
    search = undefined;

    if (this.params.list.crudParams) {
      this.params.list.crudParams.group ? group = this.params.list.crudParams.group : group = undefined;
      this.params.list.crudParams.order ? order = this.params.list.crudParams.order : order = undefined;
    }

    this.pagination ? skip = (this.currentPage - 1) * this.qtSelected : skip = undefined;
    this.qtSelected ? limit = this.qtSelected : limit = undefined;
    if (this.searchString) { search = {keys: ['type'], regex: [this.searchString]}; }

    this._crud.readFromRoute({
      route: this.params.list.route,
      limit: limit,
      skip: skip,
      match: search,
      group: group,
      order: order
    }).then(res => {
      for (let lim = this.params['list']['columns'].length, i = 0; i < lim; i++) {
        this.headers.push(this.params['list']['columns'][i]['header']);
      }

      this.columns = res['response'];

      if (res['total']) {
        this.total = res['total'];
        this.checkPagination();
        this.setListStructure();
      } else {
        this._crud.countFromRoute({
          route: this.params.list.route
        }).then(resolve => {
          this.total = resolve['response'];
          this.checkPagination();
          this.setListStructure();
        });
      }
    });
  }

  setListContentByObject = () => {
  }

  setListActionButton = () => {
    for (let i = 0; i < this.params.list.actionButton.length; i++) {
      if (this.params.list.actionButton[i].conditionOverFieldValue) {
        this.listActionButton = true;
        for (let k = 0; k < this.params.list.actionButton[i].conditionOverFieldValue.length; k++) {
          let lCheck;
          for (let l = 0; l < this.columns.length; l++) {
            if (lCheck !== l) {
              if (
                this.params.list.actionButton[i].conditionOverFieldValue[k].logical === '==='
                || this.params.list.actionButton[i].conditionOverFieldValue[k].logical === '=='
              ) {
                this.columns[l]['attributes'][this.params.list.actionButton[i].conditionOverFieldValue[k].field]
                === this.params.list.actionButton[i].conditionOverFieldValue[k].value ? this.columns[l]['_condition'] = true : lCheck = l;
              } else if (
                this.params.list.actionButton[i].conditionOverFieldValue[k].logical
                === '!==' || this.params.list.actionButton[i].conditionOverFieldValue[k].logical === '!='
              ) {
                this.columns[l]['attributes'][this.params.list.actionButton[i].conditionOverFieldValue[k].field]
                !== this.params.list.actionButton[i].conditionOverFieldValue[k].value ? this.columns[l]['_condition'] = true : lCheck = l;
              } else if (
                this.params.list.actionButton[i].conditionOverFieldValue[k].logical === '>'
              ) {
                this.columns[l]['attributes'][this.params.list.actionButton[i].conditionOverFieldValue[k].field]
                > this.params.list.actionButton[i].conditionOverFieldValue[k].value ? this.columns[l]['_condition'] = true : lCheck = l;
              } else if (
                this.params.list.actionButton[i].conditionOverFieldValue[k].logical
                === '<'
              ) {
                this.columns[l]['attributes'][this.params.list.actionButton[i].conditionOverFieldValue[k].field]
                < this.params.list.actionButton[i].conditionOverFieldValue[k].value ? this.columns[l]['_condition'] = true : lCheck = l;
              } else if (
                this.params.list.actionButton[i].conditionOverFieldValue[k].logical === '>='
              ) {
                this.columns[l]['attributes'][this.params.list.actionButton[i].conditionOverFieldValue[k].field]
                >= this.params.list.actionButton[i].conditionOverFieldValue[k].value ? this.columns[l]['_condition'] = true : lCheck = l;
              } else if (
                this.params.list.actionButton[i].conditionOverFieldValue[k].logical === '<='
              ) {
                this.columns[l]['attributes'][this.params.list.actionButton[i].conditionOverFieldValue[k].field]
                <= this.params.list.actionButton[i].conditionOverFieldValue[k].value ? this.columns[l]['_condition'] = true : lCheck = l;
              } else {
                return 'Logical property unknown';
              }
            }
          }
        }
      } else {
        this.params.list.actionButton[i].conditionOverFieldValue = false;
      }
    }
  }

  setActionbarQuantity = () => {
    if (!this.qtSelected) { this.qtSelected = this.params.actionbar.quantity; }
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
    this.checkPagination();
    this.setListContent();
  }

  onChangePage = (property) => {
    this.allAsChecked = false;
    this.deleteArray = [];
    this.setUncheckAllToDelete();
    property === 'add' ? this.currentPage ++ : this.currentPage --;
    this.setListContent();
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

  onClickToDelete = () => {
    this.onClickListActionButton('_delete', {arrayToDelete: this.deleteArray});
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

  onClickAdvancedSearch = () => {
    const dialogRef = this._dialog.open(SearchDialogComponent, {
      width: '250px',
      data: {name: this.params.list.columns}
    });
  }

  onSearch = (value) => {
    clearTimeout(this.searchResponse);

    this.searchResponse = setTimeout(() => {
      this.searchString = value;
      this.currentPage = 1;
      this.setListContent();
    }, 700);
  }
}
