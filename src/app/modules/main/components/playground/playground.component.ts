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
                    field: 'objectId',
                    message: 'Uma mensagem qualquer caso não queira usar a padrão'
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
                }]
            },
            actionbar: {
                quantity: 5
            }
        };
    }
}
