import { Component, OnInit } from '@angular/core';
import { UserService } from '../_services/index';
import {Router} from "@angular/router"

@Component({
  selector: 'app-supervisor',
  templateUrl: './supervisor.component.html',
  styleUrls: ['./supervisor.component.scss']
})
export class SupervisorComponent implements OnInit {


  currentUser: any;

  constructor(private user: UserService, private router: Router) { }

  ngOnInit() {
    this.currentUser = this.user.getCurrentUser();
    if (this.currentUser.usertype != 'admin') {
      if (this.currentUser.usertype != 'Leitung') {
        this.router.navigate(['/login']);
      }
    } 
  }

}
