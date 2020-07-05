import { Component, OnInit } from '@angular/core';
import { UserService } from '../_services/index';
import { Router } from '@angular/router';

@Component({
  selector: 'app-qualitymanagement',
  templateUrl: './qualitymanagement.component.html',
  styleUrls: ['./qualitymanagement.component.scss']
})
export class QualitymanagementComponent implements OnInit {

  currentUser: any;

  constructor(private user: UserService, private router: Router) { }

  ngOnInit() {
    this.currentUser = this.user.getCurrentUser();
    if (this.currentUser.usertype != 'admin') {
      if (this.currentUser.usertype != 'Qualitätssicherung') {
        this.router.navigate(['/login']);
      }
    } 
  }

}
