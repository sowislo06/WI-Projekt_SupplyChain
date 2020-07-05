import { Component, OnInit, ChangeDetectorRef, NO_ERRORS_SCHEMA,CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { UserService } from '../_services/index';
import {Router} from "@angular/router"
import {MatListModule} from '@angular/material/list';


@Component({
  selector: 'app-retailer',
  templateUrl: './retailer.component.html',
  styleUrls: ['./retailer.component.scss'],
  providers: [ ]
})

@NgModule({  
  schemas: [ NO_ERRORS_SCHEMA ]
})
export class RetailerComponent implements OnInit {

  currentUser: any;
  typesOfShoes: string[] = ['Boots', 'Clogs', 'Loafers', 'Moccasins', 'Sneakers'];

  constructor(private user: UserService, private router: Router) { }

  ngOnInit() {
    this.currentUser = this.user.getCurrentUser();
    //Prüfen, ob Nutzer berechtigung hat!
    if (this.currentUser.usertype != 'admin' || this.currentUser.usertype != 'Verkauf') {
      this.router.navigate(['/login']);
    } 
  }
}
