import { MatTableDataSource } from '@angular/material/table';
import { ApiService, UserService } from '../../_services/index';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, TooltipPosition } from '@angular/material';
import { Component, Inject, Input, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  //stations: MatTableDataSource<Station[]>;
  assets: MatTableDataSource<Asset[]>;
  currentUser: any;
  //columnsToDisplay = ['orderId', 'productId', 'price', 'quantity', 'producerId', 'retailerId', 'status', 'trackingInfo'];
  columnsToDisplay = ['assetId', 'name', 'stationId'];
  //stationList: any[];
  assetList: any[];
  types: any[];
  success = false;
  //station: Object;
  asset: Object;
  submitted = false;
  messageForm: FormGroup;

  @Input('regulator') regulator: boolean;

  constructor(private api: ApiService, private user: UserService, private cd: ChangeDetectorRef, public dialog: MatDialog, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.currentUser = this.user.getCurrentUser();
    //console.log("currentUser: "+this.currentUser);
    this.regulator = this.regulator !== undefined;
    //console.log(`Regulator Boolean attribute is ${this.regulator ? '' : 'non-'}present!`);

    // Load up the Orders from backend
    this.api.assets$.subscribe(currentAssets => {
      this.assets = new MatTableDataSource(currentAssets);
      this.cd.markForCheck();
    })
    this.api.queryAllAssets();
  }
/*
  onSubmit() {
    this.submitted = true;

    if (this.messageForm.invalid) {
      return;
    }

    this.api.body = {
      stationid: this.messageForm.controls.stationid.value,
    }

    this.api.queryAssetsFromStation().subscribe(api => {
      this.asset = api
      console.log(this.asset);
      this.success = true;
      //alert ("Order Created Successfully!")
    }, error => {
      this.success = false;
      alert("Problem creating Order: " + error['error']['message'])
    })

  }

/*
  // Get the list of registered Stations
  getStations() {
    //create instance of stationList
    this.stationList = [];
    //get all stations from the Blockchain
    this.api.getAllStations().subscribe(allStations => {
      var stationArray = Object.keys(allStations).map(function (stationIndex) {
        let station = allStations[stationIndex];
        return station;
      });
    
      for (let u of stationArray) {
        this.stationList.push(u);
      }
  
      console.log("List of Stations: ");
      console.log(this.stations);
    }, error => {
      console.log(JSON.stringify(error));
      alert("Problem getting list of stations: " + error['error']['message']);
    });
  }

  
  getAssetFromStation(stationid) {
    this.api.id = stationid;


    //create instance of stationList
    this.assetList = [];
    //get all stations from the Blockchain
    this.api.queryAssetsFromStation().subscribe(allAssets => {
      var assetArray = Object.keys(allAssets).map(function (assetIndex) {
        let asset = allAssets[assetIndex];
        return asset;
      });
    
      for (let u of assetArray) {
        this.assetList.push(u);
      }
  
      console.log("List of Stations: ");
      console.log(this.assets);
    }, error => {
      console.log(JSON.stringify(error));
      alert("Problem getting list of stations: " + error['error']['message']);
    });
  }

*/

}
export interface Asset {
  assetId: string;
  name: string;
  stationId: string
}
/*export interface Station {
  stationId: string;
  name: string;
}*/

