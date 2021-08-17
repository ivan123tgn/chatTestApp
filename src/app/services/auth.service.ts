import { Injectable } from '@angular/core';
import {AngularFireAuth} from "@angular/fire/auth";
import {Router} from "@angular/router";
import {Store} from "@ngrx/store";
import {login} from "../auth/auth.actions";
import {AuthState} from "../auth/reducers";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private angularFireAuth: AngularFireAuth,
              private router: Router,
              private store: Store<AuthState>) { }

  mailPasswordReg(email: string, password: string) {
    this.angularFireAuth.createUserWithEmailAndPassword(email, password)
      .then((data) => {
        console.log('Reg data', data);
      })
      .catch((error) => {
        console.log('Reg error', error.message);
      });
  }

  async login(email: string, password: string) {
    const authResult = await this.angularFireAuth.signInWithEmailAndPassword(email, password)
      .then((user) => {
        console.log(user);
        const userId = user.user?.uid;
        this.store.dispatch(login({user: userId}));
        this.router.navigate(['/chat'])
      })
      .catch((err) => console.log(err.message));
  }
}
