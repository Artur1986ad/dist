import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../model/user';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class UserService {
	constructor(private http: HttpClient) { }
	public create(user: User): Observable<User> {
		return this.http.post<User>('https://angular-project-62344.firebaseio.com/users.json', user);
	}

	public getAll(): Observable<User[]> {
		return this.http.get('https://angular-project-62344.firebaseio.com/users.json')
		.pipe(map((response: {[key: string]: any}) => {
			return Object
			.keys(response)
			.map( key => ({
				...response[key],
				id: key,
				name: response[key].name,
			}));
		}));
	}

	public getById(id: string): Observable<User> {
		return this.http.get<User>(`https://angular-project-62344.firebaseio.com/users.json/users${id}.json`)
		.pipe(map((user: User) => {
			return{
				...user, id,
			};
		}));
	}

	public remove(id: string): Observable<void> {
		return this.http.delete<void>(`https://angular-project-62344.firebaseio.com/users/${id}.json`);
	}
}
