import { Component } from '@angular/core';
import { AuthService } from './_services/auth.service';
import { UserService } from './_services/index';
import {Router} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent{
  title = 'Supply-Chain-Portal';
  currentUser: any;

  constructor(private user: UserService, private authService: AuthService, private router: Router){}

  ngOnInit() {
    this.currentUser = this.user.getCurrentUser();
  } 
  
  logout(){
    console.log("inside Logout");
    this.authService.logout();
  }
}
