import { Component, OnInit } from '@angular/core';
import { MatExpansionPanelHeader, MatDialog, MatSnackBar } from '@angular/material';

/**
 * Components
 */
import { AreaDialogComponent } from './area-dialog/area-dialog.component';
import { PeriodDialogComponent } from './period-dialog/period-dialog.component';
import { RoleDialogComponent } from './role-dialog/role-dialog.component';

/**
 * Services
 */
import { CrudService } from './../../../shared/services/parse/crud.service';
import { AuthenticationService } from './../../../shared/services/parse/authentication.service';

@Component({
  selector: 'app-configuration',
  templateUrl: './configuration.component.html',
  styleUrls: ['./configuration.component.css'],
  providers: [MatExpansionPanelHeader]
})
export class ConfigurationComponent implements OnInit {
  paramsToTableDataArea: any;
  paramsToTableDataPeriod: any;
  paramsToTableDataRole: any;

  constructor(
    private _auth: AuthenticationService,
    private _crud: CrudService,
    public _dialog: MatDialog,
    public matsnackbar: MatSnackBar
  ) { }

  ngOnInit() {
    this.makeListArea();
    this.makeListRole();
    this.makeListPeriod();
  }

  makeListArea = () => {
    this.paramsToTableDataArea = {
      toolbar: {
        title: 'Áreas',
        delete: {
          icon: 'delete',
          field: 'objectId',
          message: 'Uma mensagem qualquer caso não queira usar a padrão'
        },
        actionButton: [{
          type: 'icon',
          value: 'add_circle_outline',
          trigger: 'add'
        }],
        search: {
          icon: 'search'
        }
      },
      list: {
        route: 'Area',
        crudParams: {
          order: [{
            field: 'name',
            order: 'asc'
          }]
        },
        columns: [{
          attribute: 'name',
          header: 'Nome'
        }],
        actionButton: [{
          type: 'icon',
          value: 'edit',
          trigger: 'listEdit',
          conditionOverFieldValue: [{
            field: 'name',
            logical: '===',
            value: 'Tecnologia'
          }]
        }]
      },
      actionbar: {
        quantity: 5
      }
    };
  }

  tableDataOutputReceiverArea = (e) => {
    if (e.trigger === 'add') {
      const dialogRef = this._dialog.open(AreaDialogComponent, {
        width: '95%'
      });

      dialogRef.afterClosed().subscribe(result => {
        if (result && result.response) {
          this.makeListArea();
        }
      });
    }

    if (e.trigger === 'listEdit') {
      const dialogRef = this._dialog.open(AreaDialogComponent, {
        width: '95%',
        data: e.response
      });

      dialogRef.afterClosed().subscribe(result => {
        if (result && result.response) {
          this.makeListArea();
        }
      });
    }

    if (e.trigger === '_delete') {
      this._crud
        .delete({
          route: 'Area',
          containedIn: [{
            property: 'objectId',
            valueArray: e.response.arrayToDelete
          }]
        })
        .catch(rej => {
          console.log(rej);
        })
        .then(res => {
          this.matsnackbar.open(res['message'], '', {
            duration: 3000
          });

          setTimeout(() => {
            this.makeListArea();
          }, 1000);
        });
    }
  }

  makeListRole = () => {
    this.paramsToTableDataRole = {
      toolbar: {
        title: 'Perfis',
        delete: {
          icon: 'delete',
          field: 'objectId',
          message: 'Uma mensagem qualquer caso não queira usar a padrão'
        },
        actionButton: [{
          type: 'icon',
          value: 'add_circle_outline',
          trigger: 'add'
        }],
        search: {
          icon: 'search'
        }
      },
      list: {
        route: 'Role',
        crudParams: {
          order: [{
            field: 'name',
            order: 'asc'
          }]
        },
        columns: [{
          attribute: 'name',
          header: 'Nome'
        }],
        actionButton: [{
          type: 'icon',
          value: 'edit',
          trigger: 'listEdit',
          conditionOverFieldValue: [{
            field: 'name',
            logical: '===',
            value: 'Tecnologia'
          }]
        }]
      },
      actionbar: {
        quantity: 5
      }
    };
  }

  tableDataOutputReceiverRole = (e) => {
    if (e.trigger === 'add') {
      const dialogRef = this._dialog.open(RoleDialogComponent, {
        width: '95%'
      });

      dialogRef.afterClosed().subscribe(result => {
        if (result && result.response) {
          this.makeListRole();
        }
      });
    }

    if (e.trigger === 'listEdit') {
      const dialogRef = this._dialog.open(RoleDialogComponent, {
        width: '95%',
        data: e.response
      });

      dialogRef.afterClosed().subscribe(result => {
        if (result && result.response) {
          this.makeListRole();
        }
      });
    }

    if (e.trigger === '_delete') {
      this._crud
        .delete({
          route: 'Role',
          containedIn: [{
            property: 'objectId',
            valueArray: e.response.arrayToDelete
          }]
        })
        .catch(rej => {
          console.log(rej);
        })
        .then(res => {
          this.matsnackbar.open(res['message'], '', {
            duration: 3000
          });

          setTimeout(() => {
            this.makeListRole();
          }, 1000);
        });
    }
  }

  makeListPeriod = () => {
    this.paramsToTableDataPeriod = {
      toolbar: {
        title: 'Ciclos',
        delete: {
          icon: 'delete',
          field: 'objectId',
          message: 'Uma mensagem qualquer caso não queira usar a padrão'
        },
        actionButton: [{
          type: 'icon',
          value: 'add_circle_outline',
          trigger: 'add'
        }],
        search: {
          icon: 'search'
        }
      },
      list: {
        route: 'Period',
        crudParams: {
          order: [{
            field: 'name',
            order: 'asc'
          }]
        },
        columns: [{
          attribute: 'name',
          header: 'Nome'
        }, {
          attribute: 'startDate',
          header: 'Início'
        }, {
          attribute: 'endDate',
          header: 'Fim'
        }],
        actionButton: [{
          type: 'icon',
          value: 'edit',
          trigger: 'listEdit',
          conditionOverFieldValue: [{
            field: 'name',
            logical: '===',
            value: 'Tecnologia'
          }]
        }]
      },
      actionbar: {
        quantity: 5
      }
    };
  }

  tableDataOutputReceiverPeriod = (e) => {
    if (e.trigger === 'add') {
      const dialogRef = this._dialog.open(PeriodDialogComponent, {
        width: '95%'
      });

      dialogRef.afterClosed().subscribe(result => {
        if (result && result.response) {
          this.makeListPeriod();
        }
      });
    }

    if (e.trigger === 'listEdit') {
      const dialogRef = this._dialog.open(PeriodDialogComponent, {
        width: '95%',
        data: e.response
      });

      dialogRef.afterClosed().subscribe(result => {
        if (result && result.response) {
          this.makeListPeriod();
        }
      });
    }

    if (e.trigger === '_delete') {
      this._crud
        .delete({
          route: 'Period',
          containedIn: [{
            property: 'objectId',
            valueArray: e.response.arrayToDelete
          }]
        })
        .catch(rej => {
          console.log(rej);
        })
        .then(res => {
          this.matsnackbar.open(res['message'], '', {
            duration: 3000
          });

          setTimeout(() => {
            this.makeListPeriod();
          }, 1000);
        });
    }
  }
}
