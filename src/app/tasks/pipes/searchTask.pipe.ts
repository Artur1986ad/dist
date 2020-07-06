import { PipeTransform, Pipe } from '@angular/core';
import { Task } from '../model/task';

@Pipe({
	name: 'searchTask'
})
export class SearchUser implements PipeTransform {
	public transform(_tasks: Task[], _search: string = ''): Task[] {
		if (!_search.trim()) {
			return _tasks;
		}
		return _tasks.filter((task: Task) => {
			return task.customer.toLowerCase().includes(_search.toLowerCase());
		});
	}

}