import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";
import {FlashMessagesService} from "angular2-flash-messages";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.scss']
})
export class HomeComponent implements OnInit {

  constructor(public authService: AuthService, private router: Router, private flashMessagesService: FlashMessagesService) { }


  ngOnInit(): void {
  }

}
