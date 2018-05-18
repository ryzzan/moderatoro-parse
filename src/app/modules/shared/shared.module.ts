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
import { AuthenticationService } from './services/loopback/authentication.service';
import { CrudService } from './services/loopback/crud.service';
import { DeleteConfirmComponent } from './components/delete-confirm/delete-confirm.component';

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
    DeleteConfirmComponent
  ], declarations: [
    DeleteConfirmComponent
  ], providers: [
    AuthenticationService,
    AuthGuard,
    CrudService
  ], entryComponents: [
    DeleteConfirmComponent
  ]
})
export class SharedModule { }
