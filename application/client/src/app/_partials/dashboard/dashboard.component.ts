import { MatTableDataSource } from '@angular/material/table';
import { ApiService, UserService } from '../../_services/index';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, TooltipPosition } from '@angular/material';
import { Component, Inject, Input, OnInit, ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  stations: MatTableDataSource<Station[]>;
  currentUser: any;
  //columnsToDisplay = ['orderId', 'productId', 'price', 'quantity', 'producerId', 'retailerId', 'status', 'trackingInfo'];
  columnsToDisplay = ['stationId', 'name'];

  @Input('regulator') regulator: boolean;

  constructor(private api: ApiService, private user: UserService, private cd: ChangeDetectorRef, public dialog: MatDialog) { }

  ngOnInit() {
    this.currentUser = this.user.getCurrentUser();
    //console.log("currentUser: "+this.currentUser);
    this.regulator = this.regulator !== undefined;
    //console.log(`Regulator Boolean attribute is ${this.regulator ? '' : 'non-'}present!`);

    // Load up the Orders from backend
    this.api.stations$.subscribe(currentStations => {
      this.stations = new MatTableDataSource(currentStations);
      this.cd.markForCheck();
    })
    this.api.queryStations();
  }

}

export interface Station {
  stationId: string;
  name: string;
}