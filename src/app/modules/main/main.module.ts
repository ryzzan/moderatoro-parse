import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

/**
 * MOdules
 */
import { MainRoutingModule } from './main-routing.module';
import { SharedModule } from '../shared/shared.module';

/**
 * Components
 */
import { AreaDialogComponent } from './components/configuration/area-dialog/area-dialog.component';
import { ConfigurationComponent } from './components/configuration/configuration.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { MainComponent } from './main.component';
import {NgxMaskModule} from 'ngx-mask';
import { OccupationComponent } from './components/occupation/occupation.component';
import { ParticipantComponent } from './components/participant/participant.component';
import { ParticipantDialogComponent } from './components/participant/participant-dialog/participant-dialog.component';
import { PeriodDialogComponent } from './components/configuration/period-dialog/period-dialog.component';
import { RoleDialogComponent } from './components/configuration/role-dialog/role-dialog.component';
import { TaskDialogComponent } from './components/configuration/task-dialog/task-dialog.component';

@NgModule({
  imports: [
    CommonModule,
    MainRoutingModule,
    NgxMaskModule.forRoot(),
    SharedModule
  ],
  declarations: [
    AreaDialogComponent,
    ConfigurationComponent,
    DashboardComponent,
    MainComponent,
    OccupationComponent,
    ParticipantComponent,
    ParticipantDialogComponent,
    PeriodDialogComponent,
    RoleDialogComponent,
    TaskDialogComponent,
  ],
  entryComponents: [
    AreaDialogComponent,
    ParticipantDialogComponent,
    PeriodDialogComponent,
    RoleDialogComponent,
  ]
})
export class MainModule { }
