import { Component, OnInit, Optional, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';


@Component({
  selector: 'app-films-detail',
  templateUrl: './films-detail.component.html',
  styleUrls: ['./films-detail.component.scss']
})
export class FilmsDetailComponent implements OnInit {

  fromPage: string;
  fromDialog: string;

  constructor(public dialogRef: MatDialogRef<FilmsDetailComponent>,@Optional() @Inject(MAT_DIALOG_DATA) public data: any) 
 {}

  ngOnInit(): void {
    
  }

  closeDialog() {
    this.dialogRef.close({ event: 'close'});
  }
}
