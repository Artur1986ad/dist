import { Component, OnInit } from '@angular/core';
import { Form, Validators, FormControl, FormGroup, AbstractControl } from '@angular/forms';
import { TaskService } from '../../services/task.service';
import { Task } from '../../model/task';
import { User } from 'src/app/users/model/userBD';
import { UserService } from 'src/app/users/services/user.service';
import { TaskLayoutComponent } from '../../shared/components/task-layout/task-layout.component';

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.scss']
})
export class TaskFormComponent implements OnInit {

  public form: FormGroup;
  public perem: User[];
  public minLengthLine: number = 3;
  constructor(private taskService: TaskService, private userService: UserService, private taskLayuot: TaskLayoutComponent) { }

  public ngOnInit(): void {
	this.userService.getAll().subscribe((data: User[]) => {
		this.perem = data;
	});

	this.form = new FormGroup({
		id: new FormControl(''),
		customer: new FormControl('', [Validators.minLength(this.minLengthLine), Validators.required, Validators.pattern('^[А-Яа-яЁё]+$')]),
		name: new FormControl('', [Validators.minLength(this.minLengthLine), Validators.required, Validators.pattern('^[А-Яа-яЁё]+$')]),
		phone: new FormControl('', [Validators.minLength(this.minLengthLine), Validators.required, Validators.pattern('\\+375\\([0-9]{2}\\)[0-9]{3}-[0-9]{2}-[0-9]{2}')]),
  		adress: new FormControl('', [Validators.minLength(this.minLengthLine)]),
  		executor: new FormControl('', [Validators.required]),
		dateStart: new FormControl('', [Validators.required]) ,
		isDone: new FormControl(''),
	});
  }

  public submit(): void {
  	let isDoneDate: Date;

	if (this.form.value.isDone) {
  	isDoneDate = new Date();
	}

	const task: Task = {
		id: this.form.value.id,
  		customer: this.form.value.customer,
  		executor: this.form.value.executor,
		name: this.form.value.name,
		phone: this.form.value.phone,
	  	adress: this.form.value.adress,
	  	isDone: this.form.value.isDone ,
	  	dateStart: this.form.value.dateStart,
	  	dateEnd: isDoneDate,
  };

  this.taskService.create(task);
  this.form.reset();

  }

}
