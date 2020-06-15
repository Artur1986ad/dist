import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserService } from '../services/user.service';
import { User } from '../model/user';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit, OnDestroy {
  public users: User[];
  public userSub: Subscription;
  constructor( private usersService: UserService) { }

  public ngOnInit(): void {
	this.userSub = this.usersService.getAll().subscribe(users => {
		this.users = users;
	});
  }

  public ngOnDestroy(): void {
	/*if (this.userSub) {
		this.userSub.unsubscribe();
	}*/
  }

  public remove(id: string): void {
	this.usersService.remove(id).subscribe(() => {
		this.users = this.users.filter(post => post.id !== id);
	});
  }

}
