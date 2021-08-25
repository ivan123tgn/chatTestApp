import {Component, Input, OnInit} from '@angular/core';
import {Message} from "../models/message.model";
import {select, Store} from "@ngrx/store";
import {AppState} from "../../reducers";
import {allChatDialogs, getDialogById} from "../chat-selectors";
import {finalize, first, map, tap} from "rxjs/operators";
import {loadDialogById} from "../chat.actions";
import {Observable} from "rxjs";

@Component({
  selector: 'message-list',
  templateUrl: './message-list.component.html',
  styleUrls: ['./message-list.component.css']
})
export class MessageListComponent implements OnInit {

  loading = false;
  messages$: Observable<Message[]>;
  initializer$: Observable<any>;

  @Input()
  dialogId: string;

  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
    this.initializer$ =this.store
      .pipe(
        select(getDialogById(this.dialogId)),
        tap(dialog => {
          if(!dialog.length && !this.loading) {
            console.log('Нет данных. Загружаю.');
            this.loading = true;
            this.store.dispatch(loadDialogById({dialogId: this.dialogId}));
          }
        }),
        first(),
        finalize(() => this.loading = false)
      );


    this.messages$ = this.store
      .pipe(
        select(getDialogById(this.dialogId)),
        map(dialog => dialog[0]?.messages)
      );
  }

}
