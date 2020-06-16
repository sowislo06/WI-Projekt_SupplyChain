import { MatTableDataSource } from '@angular/material/table';
import { ApiService, UserService } from '../../_services/index';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, TooltipPosition } from '@angular/material';
import { Component, Inject, Input, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  assets: MatTableDataSource<Asset[]>;
  currentUser: any;
  columnsToDisplay = ['assetId', 'name', 'stationId'];
  stationList: any[];
  assetList: any[];
  types: any[];
  success = false;
  station: Object;
  asset: Object;
  submitted = false;
  messageForm: FormGroup;

  @Input('regulator') regulator: boolean;

  constructor(private api: ApiService, private user: UserService, private cd: ChangeDetectorRef, public dialog: MatDialog, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.currentUser = this.user.getCurrentUser();
    console.log("currentUser: " + this.currentUser);
    this.regulator = this.regulator !== undefined;
    console.log(`Regulator Boolean attribute is ${this.regulator ? '' : 'non-'}present!`);

    //Speichert alle Stations in ein Observerble-Objekt
    this.getStations();

    //Validiert die MessageForm
    this.messageForm = this.formBuilder.group({
      stationid: ['', Validators.required]
    });

    //Dieses Konstrukt lädt alle Assets aus der Blockchain
    //Mithilfe eines Oberservables
    this.api.assets$.subscribe(currentAssets => {
      this.assets = new MatTableDataSource(currentAssets);
      this.cd.markForCheck();
    })
    this.api.queryAllAssets();
  }

  //Die Methode wird aufgerufen, sobals der Submit-Button gedrückt wurde
  onSubmit() {
    this.submitted = true;

    //Prüft, ob valide Werte in der MessageForm sind
    if (this.messageForm.invalid) {
      return;
    }

    //Schreibt den Wert aus den MessageForm auf eine globale Variable
    this.api.id = this.messageForm.controls.stationid.value;
    

    //Dieses Konstrukt lädt alle Assets aus der Blockchain
    //Mithilfe eines Oberservables
    this.api.assets$.subscribe(currentAssets => {
      this.assets = new MatTableDataSource(currentAssets);
      this.cd.markForCheck();
    })
    this.api.queryAssetsFromStation();

  }


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
      console.log(this.stationList);
    }, error => {
      console.log(JSON.stringify(error));
      alert("Problem getting list of stations: " + error['error']['message']);
    });
  }
}

export interface Asset {
  assetId: string;
  name: string;
  stationId: string
}

