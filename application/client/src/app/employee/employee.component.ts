import { Component, OnInit } from '@angular/core';
import { UserService } from '../_services/index';
import {Router} from "@angular/router"

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss']
})
export class EmployeeComponent implements OnInit {
  
  currentUser: any;
  
  constructor(private user: UserService, private router: Router) { }

  ngOnInit() {
    this.currentUser = this.user.getCurrentUser();
    //Prüfen, ob Nutzer berechtigung hat!
    if (this.currentUser.usertype != 'admin') {
      if (this.currentUser.usertype != 'Mitarbeiter') {
        this.router.navigate(['/login']);
      }
    } 
  }


}
