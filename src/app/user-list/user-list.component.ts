import { Component } from '@angular/core';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent {
  id: number;
  name: string[];

  constructor(){
    this.id = 1;
    this.name = ["Natty", "John", "Mark", "Mercy"];
  }
}
