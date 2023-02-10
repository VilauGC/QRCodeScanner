import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from "@angular/material/dialog";

@Component({
  selector: 'app-info-dialog',
  templateUrl: './info-dialog.component.html',
  styleUrls: ['./info-dialog.component.css']
})
export class InfoDialogComponent implements OnInit {

 

  ngOnInit(): void {
  }

  hasDevices: boolean;
  hasPermission: boolean;

  constructor(
    @Inject(MAT_DIALOG_DATA) readonly data: any,
  ) {
    this.hasDevices = data.hasDevices;
    this.hasPermission = data.hasPermission;
  }

}
