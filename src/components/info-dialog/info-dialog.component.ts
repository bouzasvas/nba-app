import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-info-dialog',
  templateUrl: './info-dialog.component.html',
  styleUrls: ['./info-dialog.component.css']
})
export class InfoDialogComponent implements OnInit {

  @Input() cssClass: string

  @Input() heading: string;
  @Input() title: string;
  @Input() message: string;

  constructor() { }

  ngOnInit() {
  }

}
