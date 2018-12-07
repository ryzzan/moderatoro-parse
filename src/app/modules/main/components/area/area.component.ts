import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';

/**
 * Components
 */
import { AreaDialogComponent } from './area-dialog/area-dialog.component';

@Component({
    selector: 'app-area',
    templateUrl: './area.component.html',
    styleUrls: ['./area.component.css']
})
export class AreaComponent implements OnInit {
    paramsToTableData: any;
    constructor(
        public _dialog: MatDialog
    ) { }

    ngOnInit() {
        this.makeList();
    }

    makeList = () => {
        console.log(25);
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
                if (result.response) {
                    console.log(79);
                    this.makeList();
                }
            });
        }

        if (e.trigger === 'listEdit') {
            console.log(e.response);
        }

        if (e.trigger === '_delete') {
            console.log(e.response);
        }
    }
}
