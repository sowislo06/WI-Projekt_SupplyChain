import { Component, OnInit } from '@angular/core';
import { UserService } from '../_services/index';
import {Router} from "@angular/router"

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.scss']
})
export class CustomerComponent implements OnInit {

  currentUser: any;
  
  constructor(private user: UserService, private router: Router) { }

  ngOnInit() {
    this.currentUser = this.user.getCurrentUser();
    //Prüfen, ob Nutzer berechtigung hat!
    if (this.currentUser.usertype != 'admin') {
      if (this.currentUser.usertype != 'Kunde') {
        this.router.navigate(['/login']);
      }
    } 
  }
}
