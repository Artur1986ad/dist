import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-user-add',
  templateUrl: './user-add.component.html',
  styleUrls: ['./user-add.component.scss']
})
export class UserAddComponent implements OnInit {
  public LENGTH: number = 6;
  public form: FormGroup;
  constructor() { }

  public ngOnInit(): void {
	this.form = new FormGroup({
		name: new FormControl('', [Validators.minLength(this.LENGTH), Validators.required]),
		surname: new FormControl('', [Validators.minLength(this.LENGTH), Validators.required]),
		possition: new FormControl('', [Validators.minLength(this.LENGTH), Validators.required]),
    address: new FormControl('', [Validators.minLength(this.LENGTH), Validators.required]),
    phone: new FormControl('', [Validators.minLength(this.LENGTH), Validators.required]),
    rule: new FormGroup({
      type: new FormControl('admin'),
    })
	});
  }

  public submit(): any {
	const data = {...this.form.value};
	for (const iterator in data) {
		if (iterator === 'name') {
		confirm(`Успешно добавлен пользователь ${data[iterator]}`);
		}
	}
  }

}
