import { ApiService, UserService } from '../../_services/index';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, TooltipPosition } from '@angular/material';
import { Component, Inject, Input, OnInit, ChangeDetectorRef, ViewChild} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {MatPaginator, MatSort, MatTableDataSource, MatDrawer} from '@angular/material';
import {MatSidenavModule} from '@angular/material/sidenav';





@Component({
  selector: 'statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.scss']
})
export class StatisticsComponent implements OnInit {

  assetList: any[];
  activityList: any[];
  activities: MatTableDataSource<Activity[]>;
  columnsToDisplay = ['activityId', 'stationId', 'assetName', 'startDate', 'user', 'document'];
  messageForm: FormGroup;
  submitted = false;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  //Globale Statistik-Variablen
  diff;
  start;
  avg;
  isLoading = true;

  
  temp: string;
  fileToUpload: File = null;


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
      this.activities.paginator = this.paginator;
      this.activities.sort = this.sort;
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


    this.getStatistics();
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.activities.filter = filterValue;
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

  getStatistics() {

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
     
     
      length = this.activityList.length;
      
      //Lagerdauer
      if(length > 0){
        var d1 = new Date(this.activityList[length-1].startDate) //Die neueste Aktivität
        var d2 = new Date(this.activityList[0].startDate)  //Die äteste Aktivität
        this.diff = dhm(Math.abs(<any>d1-<any>d2));
      } else {
        this.diff = "Zu wenige Daten...";
      }

      //Stardatum
      if(length >= 0){
        this.start = this.activityList[0].startDate;
      } else {
        this.diff = "Zu wenige Daten...";
      }

      //Durchschnittliche Dauer pro Lager
      if(length > 0) {
        this.avg = dhm(Math.abs(<any>d1-<any>d2) / length);
      }

      //Toggle; Daten werden erst angezeigt, wenn sie vollständig geladen sind.
      this.isLoading = false;
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

  handleFileInput(files: FileList) {
    //Maximal eine Datei!
    this.fileToUpload = files.item(0);
    var reader = new FileReader();
    reader.readAsDataURL(this.fileToUpload);

    reader.onload = function () {
      console.log(reader.result.toString())
      const linkSource = reader.result.toString();
      const downloadLink = document.createElement("a");
      const fileName = "sample.pdf";

      downloadLink.href = linkSource;
      downloadLink.download = fileName;
      downloadLink.click();
    };
    reader.onerror = function (error) {
      console.log('Error: ', error);
    };
  }

  showPdf(file: string){
    const downloadLink = document.createElement("a");
    const fileName = "document.pdf";

    downloadLink.href = file;
    downloadLink.download = fileName;
    downloadLink.click();
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