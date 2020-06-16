import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { User } from '../model/user';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  @Input() public user: User;
  @Output() public onRemove = new EventEmitter<string>();
  @Output() public onEditMode = new EventEmitter<User>();

  constructor() { }

  public ngOnInit(): void {
  }

  public editUser(event: Event): void {
	event.stopPropagation();
	this.onEditMode.emit(this.user);
  }

  public deleteUser(event: Event): void {
	event.stopPropagation();
	this.onRemove.emit(this.user.id);
  }

}
