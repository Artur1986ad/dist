
import { Component, OnInit, ViewChild } from '@angular/core';
import * as moment from 'moment';

import { Task } from 'src/app/tasks/model/task';
import { TaskService } from 'src/app/tasks/services/task.service';
import { ChartItem } from 'src/app/ui/model/ChartItem';
import { SelectItem } from 'src/app/ui/model/SelectItem';
import { DropDownComponent } from 'src/app/ui/components/dropdown/dropdown.components';

@Component({
  selector: 'tasks-graph-layout',
  templateUrl: './tasks-graph.components.html',
  styleUrls: ['./tasks-graph.components.scss']
})
export class TasksGraphComponent implements OnInit {

	private tasks: Task[];
	private countYear: number = 5;
	public backgroundColorGraph: string = 'rgba(255, 99, 132, 0.2)';
	public borderColorGraph: string = 'rgba(255, 99, 132, 1)';

	public allYears: SelectItem[] = [];
	public allMonths: SelectItem[] = [];

	public selectedYear: string;
	public selectedMonth: string;

	public chart: ChartItem;

	@ViewChild('dropdownYear') public ddYear: DropDownComponent;
	@ViewChild('dropdownMonth') public ddMonth: DropDownComponent;

	constructor(private tasksService: TaskService) { }

	private loadYears(): void {
		const currentYear: number = Number(this.getCurrentYear());

		for (let i: number = currentYear; i > currentYear - this.countYear; i--) {
			this.allYears.push(new SelectItem(i.toString(), i));
		}

		this.selectedYear = this.getCurrentYear();
	}

	private loadMonths(): void {

		this.allMonths = Array.from({length: 12}, (_data: any, i: number) => {
			const month: string = new Date(null, i + 1, null).toLocaleDateString('ru', {month: 'long'});
			return new SelectItem(month, i + 1);
		});

		this.selectedMonth = moment(Date.now()).format('M');
	}

	private loadTasks(): void {
		this.tasksService.getAll().subscribe((data: Task[]) => {
			this.tasks = data;

			const daysInMonth: number = new Date(Number(this.ddYear.selectedValue), Number(this.ddMonth.selectedValue), 0).getDate();
			const groupedTasks: Task[] = this.tasks.filter((dataTask: Task) => {
				if (!dataTask.dateEnd) {
					return false;
				}

				if (moment(dataTask.dateEnd).format('M') === this.ddMonth.selectedValue &&
				 moment(dataTask.dateEnd).format('YYYY') === this.ddYear.selectedValue) {
					return true;
				}

				return false;
			});

			const tChartLabels: string[] = [];
			const daysTasks: number[] = [];
			for (let i: number = 1; i <= daysInMonth; i++) {
				tChartLabels.push(i.toString());

				daysTasks[i - 1] = daysTasks[i - 1] !== undefined ? daysTasks[i - 1] : 0;
				const findedTask: Task[] = groupedTasks.filter((gt: Task) => Number(moment(gt.dateEnd).format('D')) === i);
				findedTask.forEach((_ft: Task) => {
					daysTasks[i - 1] = daysTasks[i - 1] + 1;
				});
			}

			this.chart = {
				type: 'bar',
				header : 'График задач по дням',
				backgroundColor : [this.backgroundColorGraph],
				borderColor:  [this.borderColorGraph],
				borderWidth: 1,
				inputData: daysTasks,
				labels: tChartLabels,
			};
		});
	}

	private getCurrentYear(): string {
		return moment(Date.now()).format('YYYY');
	}

	public ngOnInit(): void {
		this.loadYears();
		this.loadMonths();
		this.loadTasks();
	}

	public dateChanged(): void {
		this.loadTasks();
	}
}
