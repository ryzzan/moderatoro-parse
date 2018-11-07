import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-playground',
    templateUrl: './playground.component.html',
    styleUrls: ['./playground.component.css']
})
export class PlaygroundComponent implements OnInit {
    paramsToTableData: any;
    constructor() { }

    ngOnInit() {
        this.paramsToTableData = {
            toolbar: {
                title: 'Tabela teste',
                delete: {
                    icon: "delete",
                    field: 'objectId',
                    message: 'Uma mensagem qualquer caso não queira usar a padrão'
                },
                actionButton: [{
                    type: 'icon',
                    value: 'flag',
                    trigger: 'flag'
                }],
                search: {
                    icon: 'search'
                }
            },
            list: {
                route: 'Form',
                columns: [{
                    attribute: 'type',
                    header: 'Tipo'
                }, {
                    attribute: 'placeholder',
                    header: 'Título'
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
        console.log(e);
    }
}
