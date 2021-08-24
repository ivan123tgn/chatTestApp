import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-dialog-info',
  templateUrl: './dialog-info.component.html',
  styleUrls: ['./dialog-info.component.css']
})
export class DialogInfoComponent implements OnInit {

  dialogId: string;

  constructor(private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.dialogId = params.dialogId;
    });

  }

}
