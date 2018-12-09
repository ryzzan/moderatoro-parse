import { Component, OnInit } from '@angular/core';
import { MatDialog, MatSnackBar } from '@angular/material';

/**
 * Components
 */
import { AreaDialogComponent } from './area-dialog/area-dialog.component';

/**
 * Services
 */
import { CrudService } from './../../../shared/services/parse/crud.service';

@Component({
    selector: 'app-area',
    templateUrl: './area.component.html',
    styleUrls: ['./area.component.css']
})
export class AreaComponent implements OnInit {
    paramsToTableData: any;
    constructor(
        private _crud: CrudService,
        public _dialog: MatDialog,
        public matsnackbar: MatSnackBar
    ) { }

    ngOnInit() {
        this.makeList();
    }

    makeList = () => {
        this.paramsToTableData = {
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

    tableDataOutputReceiver = (e) => {
        if (e.trigger === 'add') {
            const dialogRef = this._dialog.open(AreaDialogComponent, {
                width: '95%'
            });

            dialogRef.afterClosed().subscribe(result => {
                if (result && result.response) {
                    this.makeList();
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
                    this.makeList();
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
                    this.makeList();
                }, 1000);
            });
        }
    }
}
