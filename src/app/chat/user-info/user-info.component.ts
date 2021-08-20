import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {Observable, of} from "rxjs";
import {select, Store} from "@ngrx/store";
import {AppState} from "../../reducers";
import {userEmail, userId} from "../../auth/auth-selectors";

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.css']
})
export class UserInfoComponent implements OnInit {
  userId$: Observable<any> = of('');
  email$: Observable<any> = of('');

  constructor(private authService: AuthService,
              private store: Store<AppState>) { }

  ngOnInit(): void {
    this.userId$ = this.store
      .pipe(
        select(userId)
      );
    this.email$ = this.store
      .pipe(
        select(userEmail)
      );
  }

  signOut() {
    this.authService.logout();
  }

}
