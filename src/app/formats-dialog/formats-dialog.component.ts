import { Component, Inject, OnInit } from '@angular/core';
import { BarcodeFormat } from '@zxing/library';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { formatNames, formatsAvailable } from '../barcode-formats';
import { MatSelectionListChange } from '@angular/material/list';

@Component({
  selector: 'app-formats-dialog',
  templateUrl: './formats-dialog.component.html',
  styleUrls: ['./formats-dialog.component.css'],
})
export class FormatsDialogComponent implements OnInit {
  formatsAvailable = formatsAvailable;

  formatsEnabled: BarcodeFormat[];

  readonly formatNames = formatNames;

  constructor(
    @Inject(MAT_DIALOG_DATA) readonly data: any,
    private readonly _dialogRef: MatDialogRef<FormatsDialogComponent>
  ) {
    this.formatsEnabled = data.formatsEnabled || [];
  }

  ngOnInit(): void {}

  close() {
    this._dialogRef.close(this.formatsEnabled);
  }

  isEnabled(format: BarcodeFormat) {
    let bf = this.formatsEnabled.find((x) => x === format);
    if (bf !== undefined) {
      return false;
    } else {
      return true;
    }
  }

  onSelectionChange(event: MatSelectionListChange) {
    this.formatsEnabled = event.source.selectedOptions.selected.map(
      (selected) => selected.value
    );
  }
}
