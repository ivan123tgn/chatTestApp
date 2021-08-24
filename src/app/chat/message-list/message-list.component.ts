import {Component, Input, OnInit} from '@angular/core';
import {Message} from "../models/message.model";
import {select, Store} from "@ngrx/store";
import {AppState} from "../../reducers";
import {allChatDialogs, getDialogById} from "../chat-selectors";
import {finalize, first, tap} from "rxjs/operators";
import {loadDialogById} from "../chat.actions";

@Component({
  selector: 'message-list',
  templateUrl: './message-list.component.html',
  styleUrls: ['./message-list.component.css']
})
export class MessageListComponent implements OnInit {

  loading = false;
  messages: Message[];

  @Input()
  dialogId: string;

  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
    this.store
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
      )
    .subscribe();


    this.store
      .pipe(
        select(getDialogById(this.dialogId))
      )
      .subscribe(dialog => {
        if(dialog) {
         this.messages = dialog[0]?.messages;
        }
      });
  }

}
