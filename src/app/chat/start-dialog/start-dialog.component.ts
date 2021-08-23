import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../services/auth.service";
import {ChatService} from "../services/chat.service";
import {select, Store} from "@ngrx/store";
import {AppState} from "../../reducers";
import {Observable} from "rxjs";
import {userId} from "../../auth/auth-selectors";

@Component({
  selector: 'start-dialog',
  templateUrl: './start-dialog.component.html',
  styleUrls: ['./start-dialog.component.css']
})
export class StartDialogComponent implements OnInit {

  form: FormGroup;
  userId$: Observable<string|undefined>;
  userId: string|undefined;

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
  }

  onDialogStart() {
    this.chatService.createDialog(this.userId, this.form.value.to, this.form.value.message);
  }

}
