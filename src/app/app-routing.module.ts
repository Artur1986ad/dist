import {NgModule} from '@angular/core';
import {Routes, RouterModule, PreloadAllModules} from '@angular/router';
import { LoginPageComponent } from './components/Admin/login-page/login-page.component';
import { UserListComponent } from './components/Users/user-list/user-list.component';
import { AdminLayoutComponent } from './components/Admin/shared/components/admin-layout/admin-layout.component';

const routes: Routes = [
  {path: '', component: AdminLayoutComponent},
  {path: 'users', component: UserListComponent},
  {path: 'admin', loadChildren: () => import('./components/Admin/admin.module').then(module => module.AdminModule)}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
	preloadingStrategy: PreloadAllModules
  })],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
