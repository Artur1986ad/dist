import {NgModule} from '@angular/core';
import {Routes, RouterModule, PreloadAllModules} from '@angular/router';
import { LoginPageComponent } from './components/Admin/login-page/login-page.component';
import { UserListComponent } from './components/Users/user-list/user-list.component';

const routes: Routes = [
  {
   /* path: '', component: LoginPageComponent,*/
   path: '', component: UserListComponent,
  },
  {
	// tslint:disable-next-line: typedef
	path: 'admin', loadChildren: () => import('./components/Admin/admin.module').then(module => module.AdminModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
	preloadingStrategy: PreloadAllModules
  })],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
