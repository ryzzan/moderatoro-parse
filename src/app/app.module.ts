import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpModule } from '@angular/http';
import { NgModule } from '@angular/core';

/**
 * Components
 */
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';

/**
 * Modules
 */
import { SharedModule } from './modules/shared/shared.module';

/**
 * Routing
 */
import { AppRoutingModule } from './app-routing.module';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpModule,
    SharedModule
  ],
  providers: [],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
