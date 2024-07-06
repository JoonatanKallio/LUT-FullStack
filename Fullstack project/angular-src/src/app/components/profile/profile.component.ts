import { Component, OnInit } from '@angular/core';
import { AuthService } from "../../services/auth.service";
import { Router } from "@angular/router";
import {TodoapiService} from "../../services/todoapi.service";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user: Object;
  todoList: Array<any>;
  doneTodos: number;
  notDoneTodos: number;


  constructor(private authService: AuthService, private todoService: TodoapiService, private router: Router) { }

  ngOnInit(): void {
    this.authService.getProfile().subscribe(profile =>  {
      this.user = profile.user;
    },
      error => {
        console.log(error);
        return false;
      });
    this.todoService.getTodos(JSON.parse(localStorage.getItem("user")).id).subscribe(todos =>  {
        this.todoList = todos
        this.doneTodos = this.todoList.filter((todo) => todo.done === true).length;
        this.notDoneTodos = this.todoList.filter((todo) => todo.done === false).length;
      },
      error => {
        console.log(error);
        return false;
      });
  }

}
