import {Component, Input, OnInit} from '@angular/core';
import {Dialog} from "../models/dialog.model";

@Component({
  selector: 'dialog-item',
  templateUrl: './dialog-item.component.html',
  styleUrls: ['./dialog-item.component.css']
})
export class DialogItemComponent implements OnInit {

  @Input()
  dialogData: Dialog;

  constructor() { }

  ngOnInit(): void {
  }

}
