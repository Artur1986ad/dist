import { Component, OnChanges, Input, Output, EventEmitter} from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { TaskService } from '../../services/task.service';
import {Task} from '../../model/task';
import {User} from '../../../users/model/userBD';
import {UserService} from '../../../users/services/user.service';

@Component({
  selector: 'app-edit-task',
  templateUrl: './edit-task.component.html',
  styleUrls: ['./edit-task.component.scss']
})
export class EditTaskComponent implements OnChanges {

@Input() public task: any;
@Output() public onUpDate: EventEmitter<Task> = new EventEmitter<Task>();

  public minLengthLine: number = 3;
  public form: FormGroup;
  public perem: User[];

  constructor(private taskService: TaskService, private userService: UserService) {
  }

  public ngOnChanges(): void {
	this.userService.getAll().subscribe((data: User[]) => {
		this.perem = data;
	});

	this.task = JSON.parse(this.task);

	this.form = new FormGroup({
		id: new FormControl(''),
		customer: new FormControl('', [Validators.minLength(this.minLengthLine), Validators.required, Validators.pattern('^[А-Яа-яЁё]+$')]),
		name: new FormControl('', [Validators.minLength(this.minLengthLine), Validators.required, Validators.pattern('^[А-Яа-яЁё]+$')]),
		phone: new FormControl('', [Validators.minLength(this.minLengthLine), Validators.required, Validators.pattern('\\+375\\([0-9]{2}\\)[0-9]{3}-[0-9]{2}-[0-9]{2}')]),
  		adress: new FormControl('', [Validators.minLength(this.minLengthLine)]),
  		executor: new FormControl('', [Validators.required]),
		dateStart: new FormControl('', [Validators.required]),
		dateEnd: new FormControl(''),
		isDone: new FormControl(''),
		});

	this.form.setValue({
		id: this.task.id,
		customer: this.task.customer,
		executor: this.task.executor,
		adress: this.task.adress,
		name: this.task.name,
		phone: this.task.phone,
		isDone: this.task.isDone,
		dateStart: this.task.dateStart,
		dateEnd: this.task.dateEnd
	});

  }

  public submit(): void {
	const updatedTask: Task = {
		id: this.form.value.id,
		customer: this.form.value.customer,
		executor: this.form.value.executor,
		name: this.form.value.name,
		phone: this.form.value.phone,
		adress: this.form.value.adress,
		isDone: this.form.value.isDone,
		dateStart: this.form.value.dateStart,
		dateEnd: this.form.value.dateEnd,
	};
		this.onUpDate.emit(updatedTask);
		this.taskService.update(updatedTask);

  }

}
