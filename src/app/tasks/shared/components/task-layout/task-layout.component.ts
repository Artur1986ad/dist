import { Component, OnInit } from '@angular/core';
import { Task } from 'src/app/tasks/model/task';
import { Router } from '@angular/router';
import { TaskService } from 'src/app/tasks/services/task.service';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-task-layout',
  templateUrl: './task-layout.component.html',
  styleUrls: ['./task-layout.component.scss']
})
export class TaskLayoutComponent implements OnInit {

	public visableTask: boolean = true;
	public tasks: Task[] = [];
	public search: string = '';
	public choosenTask: any = {};
	public choosenAddress: string = 'Minsk';

	constructor(private tasksService: TaskService,
		private router: Router) {
	}

	public ngOnInit(): void {
		this.tasksService.tasks$.subscribe((data: Task[]) => {
			this.tasks = data;
		});
	  }

	public showTask(task: Task): void {
		this.visableTask = false;
		this.choosenTask = JSON.stringify(task);
		this.choosenAddress = task.adress;
	}

  	public removeTask(id: string): void {
		this.tasks = this.tasks.filter((task: Task) => id !== task.id);
	  	this.tasksService.remove(id);
	  }

	public addTask(): void {
		if (!this.visableTask) {
			this.visableTask = !this.visableTask;
			}
			this.router.navigate(['/admin', 'task']);
	}

  	public OnUpdate(updatedTask: Task): void {
		this.choosenAddress = updatedTask.adress;
	  		for (let i = 0; i < this.tasks.length; i++) {
	    		if (this.tasks[i].id === updatedTask.id) {
	      			this.tasks[i] = updatedTask;
				}
			}
		}
}
