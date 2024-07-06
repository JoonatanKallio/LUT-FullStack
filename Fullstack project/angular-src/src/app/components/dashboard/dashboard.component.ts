import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {TodoapiService} from "../../services/todoapi.service";
import {Router} from "@angular/router";
import {FlashMessagesService} from "angular2-flash-messages";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.scss']
})
export class DashboardComponent implements OnInit {
  todoList: Array<any>;
  todo: String;
  user: Object;

  constructor(private authService: AuthService, private todoService: TodoapiService, private router: Router, private flashMessagesService: FlashMessagesService) { }



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
      },
      error => {
        console.log(error);
        return false;
      });
  }

  onTodoCreate() {
    const owner = JSON.parse(localStorage.getItem("user")).id
    const todo = {
      owner: owner,
      todo: this.todo,
      done: false
    }
    this.todoService.postTodo(todo).subscribe(data => {
      if(data['success']) {
        this.flashMessagesService.show("Todo posted", {cssClass: "alert-success", timeout: 3000})
        this.todoService.getTodos(JSON.parse(localStorage.getItem("user")).id).subscribe(todos =>  {
            this.todoList = todos
          },
          error => {
            console.log(error);
            return false;
          });
      } else {
        this.flashMessagesService.show(data.msg, {cssClass: "alert-danger", timeout: 3000})
      }
    })
  }

  onTodoUpdate(todo) {
    const newDoneValue = !todo.done

    this.todoService.updateTodo(newDoneValue, todo._id).subscribe(data => {
      if(data['success']) {
        this.flashMessagesService.show("Todo updated", {cssClass: "alert-success", timeout: 3000})
        this.todoService.getTodos(JSON.parse(localStorage.getItem("user")).id).subscribe(todos =>  {
            this.todoList = todos
          },
          error => {
            console.log(error);
            return false;
          });
      } else {
        this.flashMessagesService.show(data.msg, {cssClass: "alert-danger", timeout: 3000})
      }
    })
  }

  removeTodo(todo) {
    this.todoService.removeTodo(todo._id).subscribe(data => {
      if(data['success']) {
        this.flashMessagesService.show("Todo removed", {cssClass: "alert-success", timeout: 3000})
        this.todoService.getTodos(JSON.parse(localStorage.getItem("user")).id).subscribe(todos =>  {
            this.todoList = todos
          },
          error => {
            console.log(error);
            return false;
          });
      } else {
        this.flashMessagesService.show(data.msg, {cssClass: "alert-danger", timeout: 3000})
      }
    })
  }
}
