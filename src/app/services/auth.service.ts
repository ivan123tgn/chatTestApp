import {Injectable} from '@angular/core';
import {AngularFireAuth} from "@angular/fire/auth";
import {Router} from "@angular/router";
import {Store} from "@ngrx/store";
import {login, logout} from "../auth/auth.actions";
import {AuthState} from "../auth/reducers";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private angularFireAuth: AngularFireAuth,
              private router: Router,
              private store: Store<AuthState>) {

    this.angularFireAuth.onAuthStateChanged(user => {
      if (user) {
        console.log('логин', user);
        const userProfile = {
          id: user.uid,
          email: user.email,
          regDate: user.metadata.creationTime
        };
        this.store.dispatch(login({user: userProfile}));
      } else {
        console.log('разлогин');
        this.store.dispatch(logout());
      }
    });

  }

  mailPasswordReg(email: string, password: string) {
    this.angularFireAuth.createUserWithEmailAndPassword(email, password)
      .then(user =>
        this.router.navigate(['/chat'])
      )
      .catch((error) => {
        console.log('Reg error', error.message);
      });
  }

  async login(email: string, password: string) {
    const authResult = await this.angularFireAuth.signInWithEmailAndPassword(email, password)
      .then(user =>
        this.router.navigate(['/chat'])
      )
      .catch((err) => console.log(err.message));
  }

  logout() {
    this.angularFireAuth.signOut()
      .then(user =>
        this.router.navigate([''])
      )
      .catch(err => console.log(err.message));
  }
}
