import { Component, OnInit} from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { User } from '../model/user';
import { UserService } from '../services/user.service';
import { UserListComponent } from '../user-list/user-list.component';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent implements OnInit {

  public form: FormGroup;
  constructor(private userService: UserService,
 			  private userList: UserListComponent) { }

  public ngOnInit(): void {
	this.form = new FormGroup({
		name: new FormControl('', [Validators.minLength(3), Validators.required]),
		surname: new FormControl('', [Validators.minLength(3), Validators.required]),
		phone: new FormControl('', [Validators.minLength(3), Validators.required]),
		position: new FormGroup({
			type: new FormControl('Администратор')
			}),
		address: new FormGroup({
		country: new FormControl('mg'),
		city: new FormControl(''),
		})
	});
  }

  public submit(): void {
	const data: any = {...this.form.value};
	for (const iterator in data) {
		if (iterator === 'name') {
		confirm(`Пользователь ${data[iterator]} успешно зарегестрирован`);
		}
	}

	const user: User = {
		name: this.form.value.name,
		surname: this.form.value.surname,
		position: this.form.value.position.type,
		adress: this.form.value.country,
		phone: this.form.value.phone,
	};

	this.userService.create(user).subscribe(() => {
		this.form.reset();
	});

		this.userList.getUser();
  }
}
