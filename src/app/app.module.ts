import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserComponent } from './components/Users/user/user.component';
import { UserListComponent } from './components/Users/user-list/user-list.component';
import { UserDashboardComponent } from './components/Users/user-dashboard/user-dashboard.component';
import { UserFormComponent } from './components/Users/user-form/user-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
	AppComponent,
	UserComponent,
	UserListComponent,
	UserDashboardComponent,
	UserFormComponent
  ],
  imports: [
	BrowserModule,
  AppRoutingModule,
  ReactiveFormsModule,
  HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
