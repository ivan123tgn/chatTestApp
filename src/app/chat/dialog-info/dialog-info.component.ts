import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Observable} from "rxjs";
import {map} from "rxjs/operators";

@Component({
  selector: 'app-dialog-info',
  templateUrl: './dialog-info.component.html',
  styleUrls: ['./dialog-info.component.css']
})
export class DialogInfoComponent implements OnInit {

  dialogId$: Observable<string>;

  constructor(private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit(): void {

    this.dialogId$ = this.route.params
      .pipe(
        map(params => params.dialogId)
      );

  }

}
