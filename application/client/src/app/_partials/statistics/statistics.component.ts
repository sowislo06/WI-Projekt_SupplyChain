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
  activityList: any[];
  activities: MatTableDataSource<Activity[]>;
  columnsToDisplay = ['activityId', 'stationId', 'assetName', 'startDate', 'user'];
  columnsToDisplayII = ['startDate'];
  messageForm: FormGroup;
  submitted = false;
  diff;

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
      
      this.activities.sort;
      this.cd.markForCheck();

    })
    this.api.queryActivityFromAsset();


    this.getTimeDuration();
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
  
      console.log("List of Assets CREATE: " + this.assetList.length);
      console.log(this.assetList);
    }, error => {
      console.log(JSON.stringify(error));
      alert("Problem getting list of assets: " + error['error']['message']);
    });
  }

  getTimeDuration() {

    //create instance of activityList
    this.activityList = [];

    //Lädt alle Acitivities von einem Asset in ein Array
    //Berechnungen: Lagerdauer, 
    this.api.getActivityFromAsset().subscribe(currentActivities => {
      var activityArray = Object.keys(currentActivities).map(function (activityIndex) {
        let activity = currentActivities[activityIndex];
        return activity;
      });
    
      for (let u of activityArray) {
        this.activityList.push(u);
      }

      //Lagerdauer
      length = this.activityList.length;
      if(length > 0){
        var d1 = new Date(this.activityList[length-1].startDate) //Die neueste Aktivität
        var d2 = new Date(this.activityList[0].startDate)  //Die äteste Aktivität
        this.diff = dhm(Math.abs(<any>d1-<any>d2));
      }
    })

    //Hilfsfunktion, die von Millisekunden in Tage:Stunden:Sekunden umrechnet
    function dhm(t){
      var cd = 24 * 60 * 60 * 1000,
          ch = 60 * 60 * 1000,
          d = Math.floor(t / cd),
          h = Math.floor( (t - d * cd) / ch),
          m = Math.round( (t - d * cd - h * ch) / 60000),
          pad = function(n){ return n < 10 ? '0' + n : n; };
      if( m === 60 ){
        h++;
        m = 0;
      }
      if( h === 24 ){
        d++;
        h = 0;
      }
      return [d, pad(h), pad(m)].join(':');
    }
    
    console.log( dhm( 3 * 24 * 60 * 60 * 1000 ) );
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