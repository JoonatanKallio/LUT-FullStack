import { Injectable } from '@angular/core';
import {map} from "rxjs/operators";
import {HttpClient, HttpHeaders} from "@angular/common/http";

const httpOptions = {
  headers: new HttpHeaders({
    "Content-Type": "application/json"
  })
}
@Injectable({
  providedIn: 'root'
})
export class TodoapiService {
  authToken: any;
  constructor(private http: HttpClient) {}
  getTodos(userId) {
    return this.http.get("http://localhost:3000/todos/"+userId, httpOptions).pipe(map((res: any) => res));
  }

  loadToken() {
    const token = localStorage.getItem("id_token");
    this.authToken = token;
  }
  updateTodo(todo, id) {
    this.loadToken()
    let headers = new HttpHeaders();
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        "Authorization": this.authToken
      })
    }
    const postUrl = "http://localhost:3000/todos/" + id
    return this.http.post(postUrl, {done: todo}, httpOptions).pipe(map((res: any) => res));
  }

  postTodo(todo) {
    this.loadToken()
    let headers = new HttpHeaders();
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        "Authorization": this.authToken
      })
    }
    const postUrl = "http://localhost:3000/todos/create/" + JSON.parse(localStorage.getItem("user")).id
    return this.http.post(postUrl, todo, httpOptions).pipe(map((res: any) => res));
  }


  removeTodo(_id) {
    this.loadToken()
    let headers = new HttpHeaders();
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        "Authorization": this.authToken
      })
    }
    const postUrl = "http://localhost:3000/todos/" + _id
    return this.http.delete(postUrl, httpOptions).pipe(map((res: any) => res));
  }
}

