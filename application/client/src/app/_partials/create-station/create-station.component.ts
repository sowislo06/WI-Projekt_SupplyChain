import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService, UserService } from './../../_services/index';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'create-station',
  templateUrl: './create-station.component.html',
  styleUrls: ['./create-station.component.scss']
})

export class CreateStationComponent implements OnInit {
  messageForm: FormGroup;
  submitted = false;
  success = false;
  station: Object;
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
      stationName: ['', Validators.required],
    });
  }

  onSubmit() {
    this.submitted = true;

    if (this.messageForm.invalid) {
      return;
    }

    this.api.body = {
      stationId: "station-" + uuid(),
      name: this.messageForm.controls.stationName.value
    }

    this.api.createStation().subscribe(api => {
      this.station = api
      console.log(this.station);
      this.api.getAllStations();
      this.success = true;
    }, error => {
      this.success = false;
      alert("Problem creating Station: " + error['error']['message'])
    })
  }

}

// Generate a random number to create stationId
function uuid() {
  const s4 = () => Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1)
  return `${s4()}`
}

