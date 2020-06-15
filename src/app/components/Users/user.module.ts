import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { UserFormComponent } from './user-form/user-form.component';
import { UserListComponent } from './user-list/user-list.component';
import { UserService } from './services/user.service';

@NgModule({
  declarations: [
	UserFormComponent,
	UserListComponent,
  ],
  imports: [
	CommonModule,
	FormsModule,
	HttpClientModule
  ],
  providers: [
  ],
  exports: [
	UserListComponent
  ]
})
export class UserListModule { }
