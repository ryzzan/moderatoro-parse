import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

/**
 * Components
 */
import { LoginComponent } from './components/login/login.component';

/**
 * Guards
 */
import { AuthGuard } from './modules/shared/guards/auth.guard';
// import { ProfileGuard } from './modules/shared/guards/profile.guard';

/**
 * Modules
 */

const routes: Routes = [{
  path: '',
  redirectTo: '/login',
  pathMatch: 'full'
}, {
  path: 'login',
  component: LoginComponent
}, {
  path: 'main',
  loadChildren: './modules/main/main.module#MainModule',
  canActivate: [AuthGuard]
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
