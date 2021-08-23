import {Injectable} from '@angular/core';
import {AngularFireAuth} from "@angular/fire/auth";
import {Router} from "@angular/router";
import {Store} from "@ngrx/store";
import {createUser, login, logout} from "../auth/auth.actions";
import {AuthState} from "../auth/reducers";
import {BehaviorSubject, from, Observable, of} from "rxjs";
import {User} from "../auth/models/user.model";
import {AngularFirestore} from "@angular/fire/firestore";
import {map, tap} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  userId: string;

  constructor(private angularFireAuth: AngularFireAuth,
              private router: Router,
              private store: Store<AuthState>,
              private firestore: AngularFirestore) {

    this.angularFireAuth.onAuthStateChanged(user => {
      if (user) {
        console.log('логин', user);
        this.userId = user.uid;
        this.store.dispatch(login());
        localStorage.setItem('userId', this.userId);
      } else {
        console.log('разлогин');
        this.userId = '';
        this.store.dispatch(logout());
        localStorage.removeItem('userId');
      }
    });

  }

  mailPasswordReg(email: string, password: string) {
    this.angularFireAuth.createUserWithEmailAndPassword(email, password)
      .then(user => {
        const userProfile = {
          id: user.user?.uid,
          email: email,
          regDate: Date.now().toString()
        };
        this.router.navigate(['/chat']);
        this.store.dispatch(createUser({user: userProfile}));
      })
      .catch((error) => {
        console.log('Reg error', error.message);
      });
  }

  async login(email: string, password: string) {
    const authResult = await this.angularFireAuth.signInWithEmailAndPassword(email, password)
      .then(user => {
          this.router.navigate(['/chat']);
      })
      .catch((err) => console.log(err.message));
  }

  logout() {
    this.angularFireAuth.signOut()
      .then(user =>
        this.router.navigate([''])
      )
      .catch(err => console.log(err.message));
  }

  getUserData(): Observable<User|undefined> {
    console.log(this.userId);
    return this.firestore.collection('users').doc<User>(this.userId).get()
      .pipe(
        map(snapshot => snapshot.data()),
        tap(data => console.log(data))
      );
  }
}
