import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

/**
 * Guards
 */
import { AuthGuard } from './guards/auth.guard';

/**
 * Modules
 */
import { ComponentModule } from './component.module';
import { MaterialModule } from './material.module';

/**
 * Services
 */
import { AuthenticationService } from './services/parse/authentication.service';
import { CrudService } from './services/parse/crud.service';
import { DeleteConfirmComponent } from './components/delete-confirm/delete-confirm.component';
import { TableDataComponent } from './components/table-data/table-data.component';

@NgModule({
  imports: [
    CommonModule,
    ComponentModule,
    MaterialModule,
    ReactiveFormsModule,
  ], exports: [
    ComponentModule,
    MaterialModule,
    ReactiveFormsModule,
    DeleteConfirmComponent,
    TableDataComponent
  ], declarations: [
    DeleteConfirmComponent,
    TableDataComponent
  ], providers: [
    AuthenticationService,
    AuthGuard,
    CrudService
  ], entryComponents: [
    DeleteConfirmComponent
  ]
})
export class SharedModule { }
