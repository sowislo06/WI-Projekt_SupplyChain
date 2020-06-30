import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService, UserService } from './../../_services/index';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'create-activity',
  templateUrl: './create-activity.component.html',
  styleUrls: ['./create-activity.component.scss']
})

export class CreateActivityComponent implements OnInit {
  messageForm: FormGroup;
  submitted = false;
  success = false;
  activity: Object;
  messages: String[];
  currentUser: any;
  producerId: String;
  producers: any[];
  assetList: any[];
  stationList: any[];
  fileToUpload: File = null;
  linkSource: any;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private api: ApiService,
    private user: UserService,
    public dialog: MatDialog) { }

  ngOnInit() {
    this.currentUser = this.user.getCurrentUser();


    this.messageForm = this.formBuilder.group({
      assetId: ['', Validators.required],
      stationId: ['', Validators.required],
    });

    this.getAssets();
    this.getStations();
  }

  onSubmit() {
    this.submitted = true;


    if (this.messageForm.invalid) {
      return;
    }

    this.api.body = {
      activityId: "activity-" + uuid(),
      name: 'Umlagerung',
      stationId: this.messageForm.controls.stationId.value,
      assetId: this.messageForm.controls.assetId.value,
      document: this.linkSource
    }

    this.api.createActivity().subscribe(api => {
      this.activity = api
      console.log(this.activity);
      this.api.getAllActivities();
      this.success = true;
    }, error => {
      this.success = false;
      alert("Problem creating Activity: " + error['error']['message'])
    })
  }

  getAssets() {
    //create instance of stationList
    this.assetList = [];
    //get all stations from the Blockchain
    this.api.getAllAssets().subscribe(allAssets => {
      var assetArray = Object.keys(allAssets).map(function (assetIndex) {
        let asset = allAssets[assetIndex];
        return asset;
      });
    
      for (let u of assetArray) {
        this.assetList.push(u);
      }
  
      console.log("List of Assets: ");
      console.log(this.assetList);
    }, error => {
      console.log(JSON.stringify(error));
      alert("Problem getting list of stations: " + error['error']['message']);
    });
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
  handleFileInput(files: FileList) {
    //Maximal eine Datei!
    this.fileToUpload = files.item(0);
    var reader = new FileReader();
    reader.readAsDataURL(this.fileToUpload);
  

    reader.onload = () => {
      this.linkSource = reader.result as string;
    };

    reader.onerror = function (error) {
      console.log('Error: ', error);
    };
  }
}



// Generate a random number to create ActivityId
function uuid() {
  const s4 = () => Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1)
  return `${s4()}`
}

