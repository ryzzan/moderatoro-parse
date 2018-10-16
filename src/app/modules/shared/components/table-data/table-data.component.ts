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
  headers: any;
  isLoading: boolean;
  listEdit: boolean;
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
    this.headers = [];
    this.isLoading = true;

    this.params.list ? this.setListContent() : this.setErrors('params.list is required');
    this.params.list.edit ? this.setListEdit() : this.listEdit = false;
    (this.params.toolbar && this.params.toolbar.title) ? this.title = this.params.toolbar.title : this.title = '';
    (this.params.toolbar && this.params.toolbar.actionButton) ? this.setToolbarActionButton() : this.toolbarActionButton = false;
    (this.params.toolbar && this.params.toolbar.delete) ? this.setToolbarDelete() : this.toolbarDelete = false;
    (this.params.actionbar && this.params.actionbar.quantity) ? this.setActionbarQuantity() : this.actionbarQuantity = false;
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
    this._crud.readFromRoute({
      route: this.params.list.route
    }).then(res => {
      for (let lim = this.params['list']['columns'].length, i = 0; i < lim; i++) {
        this.headers.push(this.params['list']['columns'][i]['header']);
      }

      this.columns = res['response'];
    });
  }

  setListContentByObject = () => {
  }

  setListEdit = () => {
    this.listEdit = true;
  }

  setListActionButton = () => {
  }

  setActionbarQuantity = () => {
    this.qtSelected = this.params.actionbar.quantity;
  }

  setErrors = (msg: string) => {
    return msg;
  }

  onClickToolbarActionButton = (trigger) => {
    this.tableDataOutput.emit({trigger: trigger});
  }
}
