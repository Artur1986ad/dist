import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { UserService } from '../services/user.service';
import { switchMap } from 'rxjs/operators';
import { User } from '../model/user';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-edit-user-page',
  templateUrl: './edit-user-page.component.html',
  styleUrls: ['./edit-user-page.component.scss']
})
export class EditUserPageComponent implements OnInit {

  public form: FormGroup;
  constructor(
	private route: ActivatedRoute,
	private userService: UserService
  ) { }

  public ngOnInit(): void {
	this.route.params.pipe(
	switchMap((params: Params) => {
		return this.userService.getById(params['id']);
	})
  ).subscribe((user: User) => {
	this.form = new FormGroup({
		name: new FormControl(user.name),
		surname: new FormControl(user.surname),
	});
  });
  }

}
