import { Component, OnInit } from '@angular/core';
import { AuthService } from "../../services/auth.service";
import { Router } from "@angular/router"
import { FlashMessagesService } from "angular2-flash-messages";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.scss']
})
export class NavbarComponent implements OnInit {

  constructor(public authService: AuthService, private router: Router, private flashMessagesService: FlashMessagesService) { }

  ngOnInit(): void {
  }

  onLogoutClick() {
    this.authService.logout();
    this.flashMessagesService.show("You have logged out", { cssClass: "alert-success",  timeout: 3000 });
    this.router.navigate(['/login'])
    return false;
  }
}
