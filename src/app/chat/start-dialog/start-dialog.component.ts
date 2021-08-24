import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../services/auth.service";
import {ChatService} from "../services/chat.service";
import {select, Store} from "@ngrx/store";
import {AppState} from "../../reducers";
import {Observable} from "rxjs";
import {userId} from "../../auth/auth-selectors";
import {Dialog} from "../models/dialog.model";
import {allChatDialogs} from "../chat-selectors";

@Component({
  selector: 'start-dialog',
  templateUrl: './start-dialog.component.html',
  styleUrls: ['./start-dialog.component.css']
})
export class StartDialogComponent implements OnInit {

  form: FormGroup;
  userId$: Observable<string|undefined>;
  userId: string|undefined;
  userDialogs$: Observable<Dialog[]>;
  userDialogs: Dialog[];

  constructor(
    private fb: FormBuilder,
    private chatService: ChatService,
    private store: Store<AppState>) {

    this.form = fb.group({
      to: ['', [Validators.required]],
      message: ['', [Validators.required]]
    });

  }

  ngOnInit(): void {
    this.userId$ = this.store
      .pipe(
        select(userId)
      );
    this.userId$.subscribe(val => this.userId = val);
    this.userDialogs$ = this.store
      .pipe(
        select(allChatDialogs)
      );
    this.userDialogs$.subscribe(val => this.userDialogs = val);
  }

  onDialogStart() {
    const dialogIndex = this.userDialogs.findIndex(dialog => dialog.between.includes(this.form.value.to));
    if (dialogIndex === -1) {
      this.chatService.createDialog(this.userId, this.form.value.to, this.form.value.message);
    } else {
      const newMessage = {
        from: this.userId,
        to: this.form.value.to,
        text: this.form.value.message,
        id: Date.now().toString()
      };
      this.chatService.createMessageInDialog(this.userDialogs, dialogIndex, newMessage);
    }
  }

}
