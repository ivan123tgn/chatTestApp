import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {AuthActions} from "./action-types";
import {concatMap, map, tap} from "rxjs/operators";
import {AngularFirestore} from "@angular/fire/firestore";
import {AngularFireAuth} from "@angular/fire/auth";
import {AuthService} from "../services/auth.service";
import {userDataLoaded} from "./auth.actions";
import {ToastrService} from "ngx-toastr";

@Injectable()
export class AuthEffects {

  createUser$ = createEffect(() =>
    this.actions$
      .pipe(
        ofType(AuthActions.createUser),
        tap(action => {
          this.firestore.collection('users').doc(action.user?.id).set(action.user)
            .then(() => this.toastr.info('Profile is created! 🦁'))
            .catch(err => this.toastr.info(err.message  + '😡', 'Error!'))
        })
      ), {dispatch: false}
  )

  loadUser$ = createEffect(() =>
    this.actions$
      .pipe(
        ofType(AuthActions.login),
        concatMap(action => this.authService.getUserData()),
        map(userData => userDataLoaded({user: userData}))
      )
  )

  constructor(private actions$: Actions,
              private firestore: AngularFirestore,
              private auth: AngularFireAuth,
              private authService: AuthService,
              private toastr: ToastrService) {}

}
