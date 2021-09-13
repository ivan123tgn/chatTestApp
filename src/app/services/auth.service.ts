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
import {ToastrService} from "ngx-toastr";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  userId: string;

  constructor(private angularFireAuth: AngularFireAuth,
              private router: Router,
              private store: Store<AuthState>,
              private firestore: AngularFirestore,
              private toastr: ToastrService) {

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
          regDate: Date.now(),
          avatarUrl: 'assets/user-info/default-avatar.jpg'
        };
        this.router.navigate(['/chat']);
        this.store.dispatch(createUser({user: userProfile}));
        this.toastr.success('Registration is successful!');
      })
      .catch((error) => {
        this.toastr.error(error.message, 'Registration error!');
      });
  }

  async login(email: string, password: string) {
    const authResult = await this.angularFireAuth.signInWithEmailAndPassword(email, password)
      .then(user => {
          this.router.navigate(['/chat']);
          this.toastr.success('Welcome to ChatApp!');
      })
      .catch((err) => this.toastr.error(err.message, 'Sign in error!'));
  }

  loginGoogle() {
    this.angularFireAuth.signInWithPopup(new firebase.auth.GoogleAuthProvider())
      .then(result => {
        this.checkUserData(result);
        this.toastr.success('Welcome to ChatApp!');
      })
      .catch((err) => this.toastr.error(err.message, 'Google sign in error!'));
  }

  loginGithub() {
    const provider = new firebase.auth.GithubAuthProvider();
    this.angularFireAuth.signInWithPopup(provider)
      .then(result => {
        this.checkUserData(result);
        this.toastr.success('Welcome to ChatApp!');
      })
      .catch((err) => this.toastr.error(err.message, 'GitHub sign in error!'));

  }

  logout() {
    this.angularFireAuth.signOut()
      .then(user => {
          this.router.navigate(['']);
      })
      .catch(err => this.toastr.error(err.message, 'Logout error!'));
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
            regDate: Date.now(),
            avatarUrl: 'assets/user-info/default-avatar.jpg'
          };
          this.store.dispatch(createUser({user: userProfile}));
        }
        this.router.navigate(['/chat']);
      });
  }
}
