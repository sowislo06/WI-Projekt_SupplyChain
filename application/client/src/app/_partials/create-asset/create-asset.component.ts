import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService, UserService } from './../../_services/index';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'create-asset',
  templateUrl: './create-asset.component.html',
  styleUrls: ['./create-asset.component.scss']
})

export class CreateAssetComponent implements OnInit {
  messageForm: FormGroup;
  submitted = false;
  success = false;
  asset: Object;
  messages: String[];
  currentUser: any;
  producerId: String;
  producers: any[];

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private api: ApiService,
    private user: UserService,
    public dialog: MatDialog) { }

  ngOnInit() {
    this.currentUser = this.user.getCurrentUser();


    this.messageForm = this.formBuilder.group({
      assetName: ['', Validators.required],
    });
  }

  onSubmit() {
    this.submitted = true;

    if (this.messageForm.invalid) {
      return;
    }

    this.api.body = {
      assetId: "asset-" + uuid(),
      name: this.messageForm.controls.assetName.value,
      stationId: 'station-14a9'
    }

    this.api.createAsset().subscribe(api => {
      this.asset = api
      console.log(this.asset);
      this.api.getAllAssets();
      this.success = true;
    }, error => {
      this.success = false;
      alert("Problem creating Asset: " + error['error']['message'])
    })
  }

}

// Generate a random number to create AssetId
function uuid() {
  const s4 = () => Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1)
  return `${s4()}`
}

