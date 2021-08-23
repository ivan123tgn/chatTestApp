import { Component, OnInit } from '@angular/core';
import {select, Store} from "@ngrx/store";
import {AppState} from "../../reducers";
import {Observable} from "rxjs";
import {Dialog} from "../models/dialog.model";
import {allChatDialogs} from "../chat-selectors";

@Component({
  selector: 'dialog-list',
  templateUrl: './dialog-list.component.html',
  styleUrls: ['./dialog-list.component.css']
})
export class DialogListComponent implements OnInit {

  dialogs$: Observable<Dialog[]>;
  dialogs: Dialog [];

  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
    this.dialogs$ = this.store
      .pipe(
        select(allChatDialogs)
      );
    this.dialogs$.subscribe(dialogs => {
      this.dialogs = dialogs;
    });
  }

}
