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
import { AreaComponent } from './components/area/area.component';
import { ConfigurationComponent } from './components/configuration/configuration.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { MainComponent } from './main.component';
import { OccupationComponent } from './components/occupation/occupation.component';
import { ParticipantComponent } from './components/participant/participant.component';
import { RoleComponent } from './components/role/role.component';
import { AreaDialogComponent } from './components/area/area-dialog/area-dialog.component';

@NgModule({
  imports: [
    CommonModule,
    MainRoutingModule,
    SharedModule
  ],
  declarations: [
    AreaComponent,
    AreaDialogComponent,
    ConfigurationComponent,
    DashboardComponent,
    MainComponent,
    OccupationComponent,
    ParticipantComponent,
    RoleComponent,
  ],
  entryComponents: [
    AreaDialogComponent
  ]
})
export class MainModule { }
