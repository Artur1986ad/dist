import { Component, OnInit } from '@angular/core';
import { User } from '../model/user';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  public users: User[] = [{id: 1, name: 'Artur', surname : 'Pakhomau', position : 'administrator', adress : 'ul. Mira h.5 fl 98', phone: '77777777'},
  {id: 1, name: 'Dima', surname : 'Ivanov', position : 'worker', adress : 'ul. Mira h.5 fl 98', phone: '888888888'}]
  constructor() { }

  ngOnInit(): void {
  }

}
