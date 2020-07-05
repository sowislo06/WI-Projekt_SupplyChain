import { Component, OnInit } from '@angular/core';
import { UserService } from '../_services/index';
import {Router} from "@angular/router"

@Component({
  selector: 'app-procurement',
  templateUrl: './procurement.component.html',
  styleUrls: ['./procurement.component.scss']
})
export class ProcurementComponent implements OnInit {

  currentUser: any;

  constructor(private user: UserService, private router: Router) { }

  ngOnInit() {
    this.currentUser = this.user.getCurrentUser();
    if (this.currentUser.usertype != 'admin') {
      if (this.currentUser.usertype != 'Einkauf') {
        this.router.navigate(['/login']);
      }
    } 
  }

}
