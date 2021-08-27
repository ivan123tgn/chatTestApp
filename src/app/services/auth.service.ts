import {Injectable} from '@angular/core';
import {AngularFireAuth} from "@angular/fire/auth";
import {Router} from "@angular/router";
import {Store} from "@ngrx/store";
import {createUser, login, logout} from "../auth/auth.actions";
import {AuthState} from "../auth/reducers";
import {Observable} from "rxjs";
import {User, userUndefined} from "../auth/models/user.model";
import {AngularFirestore} from "@angular/fire/firestore";
import {map, tap} from "rxjs/operators";
import firebase from "firebase";
import UserCredential = firebase.auth.UserCredential;

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
      .then(result => {
        const userProfile = {
          id: result.user?.uid || 'unknown',
          email: email || 'unknown',
          regDate: Date.now()
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

  loginGoogle() {
    this.angularFireAuth.signInWithPopup(new firebase.auth.GoogleAuthProvider())
      .then(result => {
        this.checkUserData(result);
      })
      .catch((err) => console.log(err.message));
  }

  loginGithub() {
    const provider = new firebase.auth.GithubAuthProvider();
    this.angularFireAuth.signInWithPopup(provider)
      .then(result => {
        this.checkUserData(result);
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

  getUserData(): Observable<User> {
    return this.firestore.collection('users').doc<User>(this.userId).get()
      .pipe(
        map(snapshot => snapshot.data() || userUndefined),
        tap(data => console.log(data))
      );
  }

  checkUserData(result: UserCredential) {
    this.firestore.collection('users').doc<User>(this.userId).get().toPromise()
      .then(doc => {
        if (!doc.exists) {
          const userProfile = {
            id: result.user?.uid || 'unknown',
            email: result.user?.email || 'unknown',
            regDate: Date.now()
          };
          this.store.dispatch(createUser({user: userProfile}));
        }
        this.router.navigate(['/chat']);
      });
  }
}
