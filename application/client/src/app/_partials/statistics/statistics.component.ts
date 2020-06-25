import { ApiService, UserService } from '../../_services/index';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, TooltipPosition } from '@angular/material';
import { Component, Inject, Input, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.scss']
})
export class StatisticsComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
