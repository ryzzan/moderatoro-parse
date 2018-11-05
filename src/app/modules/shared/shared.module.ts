import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

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
 * Pipes
 */
import { FormatDateDmyPipe } from './pipes/format-date-dmy.pipe';
import { NumberToLetterPipe } from './pipes/number-to-letter.pipe';

/**
 * Services
 */
import { ArrayService } from './services/array.service';
import { AuthenticationService } from './services/parse/authentication.service';
import { CrudService } from './services/parse/crud.service';
import { ObjectService } from './services/object.service';

/**
 * Component
 */
import { DeleteConfirmComponent } from './components/delete-confirm/delete-confirm.component';
import { SearchDialogComponent } from './components/search-dialog/search-dialog.component';
import { TableDataComponent } from './components/table-data/table-data.component';

@NgModule({
  imports: [
    CommonModule,
    ComponentModule,
    MaterialModule,
    ReactiveFormsModule,
  ], exports: [
    ComponentModule,
    FormatDateDmyPipe,
    MaterialModule,
    NumberToLetterPipe,
    ReactiveFormsModule,
    DeleteConfirmComponent,
    SearchDialogComponent,
    TableDataComponent
  ], declarations: [
    DeleteConfirmComponent,
    FormatDateDmyPipe,
    NumberToLetterPipe,
    SearchDialogComponent,
    TableDataComponent
  ], providers: [
    ArrayService,
    AuthenticationService,
    AuthGuard,
    CrudService,
    ObjectService
  ], entryComponents: [
    DeleteConfirmComponent,
    SearchDialogComponent
  ]
})
export class SharedModule { }
