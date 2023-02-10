import { Component } from '@angular/core';
import { BarcodeFormat } from "@zxing/library";
import { MatDialog } from '@angular/material/dialog';
import { BehaviorSubject } from "rxjs";
import { FormatsDialogComponent } from "./formats-dialog/formats-dialog.component";
import { InfoDialogComponent } from "./info-dialog/info-dialog.component";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'qrCodeScanner';

  constructor(private readonly _dialog: MatDialog) {}

  hasDevices: boolean = false;
  tryHarder: boolean = false;
  torchEnabled: boolean = false;
  torchAvailable$ = new BehaviorSubject<boolean>(false);
  hasPermission: boolean = false;
  deviceSelected: string = '';
  qrResultString: string = '';

  availableDevices: MediaDeviceInfo[] = [];
  deviceCurrent!: MediaDeviceInfo;

  formatsEnabled: BarcodeFormat[] = [
    BarcodeFormat.QR_CODE,
  ];


  toggleTryHarder(): void {
    this.tryHarder = !this.tryHarder;
  }

  toggleTorch(): void {
    this.torchEnabled = !this.torchEnabled;
  }

  openFormatsDialog() {
    const data = {
      formatsEnabled: this.formatsEnabled,
    };

    this._dialog
      .open(FormatsDialogComponent, { data })
      .afterClosed()
      .subscribe(x => {
        if (x) {
          this.formatsEnabled = x;
        }
      });
  }

  openInfoDialog() {
    const data = {
      hasDevices: this.hasDevices,
      hasPermission: this.hasPermission,
    };

    this._dialog.open(InfoDialogComponent, { data });
  }

  onDeviceSelectChange(selected: string) {
    const selectedStr = selected || '';
    if (this.deviceSelected === selectedStr) { return; }
    this.deviceSelected = selectedStr;
    const device = this.availableDevices.find(x => x.deviceId === selected);
    if(device !== undefined) {
      this.deviceCurrent = device; 
    }
  }

  onDeviceChange(device: MediaDeviceInfo) {
    const selectedStr = device?.deviceId || '';
    if (this.deviceSelected === selectedStr) { return; }
    this.deviceSelected = selectedStr;
    this.deviceCurrent = device || undefined;
  }

  onCodeResult(resultString: string) {
    this.qrResultString = resultString;
    console.log(this.qrResultString);
  }

  onHasPermission(has: boolean) {
    this.hasPermission = has;
  }

  onTorchCompatible(isCompatible: boolean): void {
    this.torchAvailable$.next(isCompatible || false);
  }

  onCamerasFound(devices: MediaDeviceInfo[]): void {
    this.availableDevices = devices;
    this.hasDevices = Boolean(devices && devices.length);
  }

  clearResult(): void {
    this.qrResultString = '';
  }

}
