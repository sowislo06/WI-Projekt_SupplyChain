import { ApiService, UserService } from '../../_services/index';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, TooltipPosition } from '@angular/material';
import { Component, Inject, Input, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ExecSyncOptionsWithBufferEncoding } from 'child_process';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.scss']
})
export class StatisticsComponent implements OnInit {

  assetList: any[];
  activities: MatTableDataSource<Activity[]>;
  columnsToDisplay = ['activityId', 'stationId', 'assetName', 'startDate', 'user'];
  messageForm: FormGroup;
  submitted = false;

  constructor(private api: ApiService, private cd: ChangeDetectorRef, private formBuilder: FormBuilder) { }

  ngOnInit() {

    //Holt alle Assets und speichert diese in das Array
    //In der HTML greifen wir auf das Array zu
    this.getAssets();

    //Validiert die MessageForm
    this.messageForm = this.formBuilder.group({
      assetid: ['', Validators.required]
    });

    //Dieses Konstrukt lädt alle Activities aus der Blockchain
    //Mithilfe eines Oberservables
    this.api.activities$.subscribe(currentActivities => {
      this.activities = new MatTableDataSource(currentActivities);
      this.cd.markForCheck();
    })
    this.api.queryAllActivities();

  }

  //Die Methode wird aufgerufen, sobals der Submit-Button gedrückt wurde
  onSubmit() {
    this.submitted = true;

    //Prüft, ob valide Werte in der MessageForm sind
    if (this.messageForm.invalid) {
      return;
    }

    //Schreibt den Wert aus den MessageForm auf eine globale Variable
    this.api.id = this.messageForm.controls.assetid.value;
    console.log(this.api.id);

    //Dieses Konstrukt lädt alle Activities aus der Blockchain
    //Mithilfe eines Oberservables
    this.api.activities$.subscribe(currentActivities => {
      this.activities = new MatTableDataSource(currentActivities);
      this.cd.markForCheck();
    })
    this.api.queryActivityFromAsset();
  }

  // Get the list of registered Assets
  getAssets() {
    //create instance of assetList
    this.assetList = [];
    //get all assets from the Blockchain
    this.api.getAllAssets().subscribe(allAssets => {
      var assetArray = Object.keys(allAssets).map(function (assetIndex) {
        let activity = allAssets[assetIndex];
        return activity;
      });
    
      for (let u of assetArray) {
        this.assetList.push(u);
      }
  
      console.log("List of Assets: ");
      console.log(this.assetList);
    }, error => {
      console.log(JSON.stringify(error));
      alert("Problem getting list of assets: " + error['error']['message']);
    });
  }

}

export interface Activity {
  activityId: string;
  name: string;
  assetId: string;
  stationId: string;
  startDate: string;
  user: string
}