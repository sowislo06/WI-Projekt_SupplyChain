import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService, UserService } from './../../_services/index';
import { MatDialog } from '@angular/material';
import { convertToR3QueryMetadata } from '@angular/core/src/render3/jit/directive';

@Component({
  selector: 'qualitycheck',
  templateUrl: './qualitycheck.component.html',
  styleUrls: ['./qualitycheck.component.scss']
})

export class QualitycheckComponent implements OnInit {
  messageForm: FormGroup;
  asset: Object;
  submitted = false;
  success = false;
  messages: String[];
  currentUser: any;
  producerId: String;
  producers: any[];
  assetList: any[];

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private api: ApiService,
    private user: UserService,
    public dialog: MatDialog) { }

  ngOnInit() {
    this.currentUser = this.user.getCurrentUser();


    this.messageForm = this.formBuilder.group({
      assetId: ['', Validators.required]
    });

    this.getAssets();
  }

  onSubmit() {
    this.submitted = true;


    if (this.messageForm.invalid) {
      return;
    }
    console.log("Test");
    //Schreibt den Wert aus den MessageForm auf eine globale Variable
    this.api.id = this.messageForm.controls.assetId.value;
    
    this.api.setQualitiy();
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
      alert("Problem getting list of assets: " + error['error']['message']);
    });
  }
}
