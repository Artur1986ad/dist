import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { User } from '../../model/userBD';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent implements OnInit {

  public form: FormGroup;

  @ViewChild('input') public inputRef: ElementRef;
  public image: File;
  public minLengthLine: number = 3;
  public imagePreview: any = '';

  constructor(private userService: UserService) {
  }

  public ngOnInit(): void {
	this.form = new FormGroup({
		id: new FormControl(''),
		name: new FormControl('', [Validators.minLength(this.minLengthLine), Validators.required, Validators.pattern('^[А-Яа-яЁё]+$')]),
		surname: new FormControl('', [Validators.minLength(this.minLengthLine), Validators.required, Validators.pattern('^[А-Яа-яЁё]+$')]),
		phone: new FormControl('', [Validators.minLength(this.minLengthLine), Validators.required, Validators.pattern('\\+375\\([0-9]{2}\\)[0-9]{3}-[0-9]{2}-[0-9]{2}')]),
		userpic: new FormControl(''),
		position: new FormGroup({
			type: new FormControl('Администратор')
		}),
		adress: new FormGroup({
			country: new FormControl('mg'),
			street: new FormControl(''),

		})
	});
  }

  public submit(): void {
	const user: User = {
		id: this.form.value.id,
		name: this.form.value.name,
		surname: this.form.value.surname,
		position: this.form.value.position.type,
		country: this.form.value.adress.country,
		street: this.form.value.adress.street,
		phone: this.form.value.phone,
		userpic: this.form.value.userpic
	};

	this.userService.create(user);

	const data: any = {...this.form.value};
	for (const iterator in data) {
		if (iterator === 'name') {
		confirm(`Пользователь ${data[iterator]} успешно зарегестрирован`);
		}
	}

	this.form.reset();
	document.getElementById('file').nodeValue = '';
	document.getElementById('thumb').remove();
  }

  public compress(data): void {
	const that = this;
	const width: number = 100;
	const height: number = 100;
	const fileName: string = data.target.files[0].name;
	const reader: FileReader = new FileReader();
	reader.readAsDataURL(data.target.files[0]);
	reader.onload = event => {
		const img = new Image();
		if (typeof event.target.result === 'string') {
		img.src = event.target.result;
		}
		img.onload = () => {

		const elem = document.createElement('canvas');
		elem.id = 'thumb';
		elem.width = width;
		elem.height = height;
		const ctx = elem.getContext('2d');
		ctx.drawImage(img, 0, 0, width, height);
		ctx.canvas.toBlob((blob) => {
			const file = new File([blob], fileName, {
			type: 'image/jpeg',
			lastModified: Date.now()
			});
			let reader: FileReader = new FileReader();
			reader.readAsDataURL(file);
			reader.onloadend = function(): void {
			let base64data = reader.result;
			that.form.controls.userpic.setValue(base64data);
			};
		}, 'image/jpeg', 1);
		};
	};
  }

  public triggerClick(): void {
	this.inputRef.nativeElement.click();
  }

  public onFileUpload(event: any): void {
	const file: File = event.target.files[0];
	this.image = file;
	const reader: FileReader = new FileReader();
	reader.onload = () => {
		this.imagePreview = reader.result;
	};
	reader.readAsDataURL(file);
  }
}
