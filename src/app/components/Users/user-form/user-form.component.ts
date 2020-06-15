import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { User } from '../model/user';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent implements OnInit {

  public form: FormGroup;
  constructor(private userService: UserService) { }

  public ngOnInit(): void {
	this.form = new FormGroup({
		name: new FormControl('', [Validators.minLength(3), Validators.required]),
		surname: new FormControl('', [Validators.minLength(3), Validators.required]),
		phone: new FormControl('', [Validators.minLength(3), Validators.required]),
		position: new FormGroup({
			type: new FormControl('admin')
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
		confirm(`Вы успешно зарегестрированы ${data[iterator]}`);
		}
	}

	const user: User = {
		name: this.form.value.name,
		surname: this.form.value.surname,
		position: this.form.value.position,
		adress: this.form.value.country,
		phone: this.form.value.phone,
	};

	this.userService.create(user).subscribe(() => {
		this.form.reset();
	});
  }
}
