import {Injectable} from "@angular/core";
import {Store} from "@ngrx/store";
import {AppState} from "../../reducers";
import {addDialog} from "../chat.actions";
import {AngularFirestore} from "@angular/fire/firestore";
import {AuthService} from "../../services/auth.service";
import {Dialog} from "../models/dialog.model";
import {Observable, of} from "rxjs";
import {map, tap} from "rxjs/operators";
import firebase from "firebase";

@Injectable()
export class ChatService {

  constructor(private store: Store<AppState>,
              private afs: AngularFirestore,
              private authService: AuthService) {}

  createDialog(from: string|undefined, to: string, text: string) {
    const newMessage = {
      from: from,
      to: to,
      text: text,
      id: Date.now().toString()
    };
    const newDialog = {
      between: [from, to],
      messages: [newMessage],
      id: Date.now().toString()
    };
    this.store.dispatch(addDialog({dialog: newDialog}))
  }

  findAllDialogs(): Observable<Dialog[]> {
    return this.afs.collection('dialogs', ref => ref.where('between', 'array-contains', localStorage.getItem('userId'))).get()
      .pipe(
        map(querySnapshot => querySnapshot.docs.map(doc => <Dialog>doc.data()))
      );
  }

}
