import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {Observable, of} from "rxjs";
import {select, Store} from "@ngrx/store";
import {AppState} from "../../reducers";
import {avatar, isLoggedIn, userEmail, userId} from "../../auth/auth-selectors";
import {MatDialog} from "@angular/material/dialog";
import {AddImageDialogComponent} from "./add-image-dialog/add-image-dialog.component";

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.css']
})
export class UserInfoComponent implements OnInit {
  userId$: Observable<any> = of('');
  email$: Observable<any> = of('');
  isLoggedIn$: Observable<any> = of('');
  avatarUrl$: Observable<any>=of('');

  constructor(private authService: AuthService,
              private store: Store<AppState>,
              public dialog: MatDialog) { }

  ngOnInit(): void {
    this.userId$ = this.store
      .pipe(
        select(userId)
      );
    this.email$ = this.store
      .pipe(
        select(userEmail)
      );
    this.isLoggedIn$ = this.store
      .pipe(
        select(isLoggedIn)
      );
    this.avatarUrl$ = this.store
      .pipe(
        select(avatar)
      );
  }

  signOut() {
    this.authService.logout();
  }

  openAddImageDialog() {
    this.dialog.open(AddImageDialogComponent, {
      disableClose: true
    });
  }

}
