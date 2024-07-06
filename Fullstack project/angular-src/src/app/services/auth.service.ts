import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";

import { map } from 'rxjs/operators';



const httpOptions = {
  headers: new HttpHeaders({
    "Content-Type": "application/json"
  })
}
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  authToken: any;
  user: any;
  constructor(private http: HttpClient) {}

  registerUser(user) {
    return this.http.post("http://localhost:3000/users/register", user, httpOptions).pipe(map((res: any) => res));
  }
  authenticateUser(user) {
    return this.http.post("http://localhost:3000/users/authenticate", user, httpOptions).pipe(map((res: any) => res));
  }

  storeUserData(token, user) {
    localStorage.setItem("id_token", token);
    localStorage.setItem('user',JSON.stringify(user));
    this.authToken = token;
    this.user = user;
  }

  getProfile() {
    this.loadToken()
    let headers = new HttpHeaders();
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        "Authorization": this.authToken
      })
    }
    return this.http.get("http://localhost:3000/users/profile", httpOptions).pipe(map((res: any) => res));
  }

  loadToken() {
    const token = localStorage.getItem("id_token");
    this.authToken = token;
  }


  loggedIn() {
    const token: any = localStorage.getItem("id_token");
    return token;
  }

  notLoggedIn() {
    const token: any = localStorage.getItem("id_token");
    return !token;
  }

  logout() {
    this.authToken = null;
    this.user = null;
    localStorage.clear();
  }
}
