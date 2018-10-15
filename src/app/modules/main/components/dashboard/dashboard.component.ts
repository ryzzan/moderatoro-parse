import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  paramsToTableData: any;

  constructor() { }

  ngOnInit() {
    this.paramsToTableData = {
      toolbar: {
        title: 'Tabela teste'
      },
      list: {
        route: 'Form',
        columns: [{
          columnDef: 'type',
          header: 'Tipo'
        }, {
          columnDef: 'placeholder',
          header: 'Título'
        }]
      }
    };
  }
}
