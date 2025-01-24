import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user',
  imports: [],
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss'
})
export class UserComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    console.log('UserComponent.....................................');
  }

}
