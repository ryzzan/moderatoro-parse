import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { FormCreatorComponent } from 'src/app/modules/shared/components/form-creator/form-creator.component';

@Component({
    selector: 'app-playground',
    templateUrl: './playground.component.html',
    styleUrls: ['./playground.component.css']
})
export class PlaygroundComponent implements OnInit {
    paramsToTableData: any;
    constructor(
        public _dialog: MatDialog
    ) { }

    ngOnInit() {
        this.paramsToTableData = {
            toolbar: {
                title: 'Tabela teste',
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
                route: 'Form',
                crudParams: {
                    group: [{
                        field: 'project',
                        order: 'asc'
                    }],
                    order: [{
                        field: 'component',
                        order: 'asc'
                    }, {
                        field: 'project',
                        order: 'asc'
                    }]
                },
                columns: [{
                    attribute: 'project',
                    header: 'Projeto'
                }],
                actionButton: [{
                    type: 'icon',
                    value: 'edit',
                    trigger: 'listEdit',
                    conditionOverFieldValue: [{
                        field: 'type',
                        logical: '===',
                        value: 'text'
                    }, {
                        field: 'placeholder',
                        logical: '===',
                        value: 'Teste select'
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
            this._dialog.open(FormCreatorComponent, {
                width: '95%'
            })
        }
        
        if (e.trigger === 'listEdit') {
            console.log(e.response);
        }

        if (e.trigger === '_delete') {
            console.log(e.response);
        }
    }
}
