import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {DialogsActions} from "./action-types";
import {concatMap, map, tap} from "rxjs/operators";
import {AngularFirestore} from "@angular/fire/firestore";
import {ChatService} from "./services/chat.service";
import {allDialogsLoaded, dialogByIdLoaded} from "./chat.actions";
import firebase from "firebase";
import FieldValue = firebase.firestore.FieldValue;

@Injectable()
export class ChatEffects {
  saveDialog$ = createEffect(() =>
    this.actions$
      .pipe(
        ofType(DialogsActions.addDialog),
        tap(action => {
          this.afs.collection('dialogs').doc(action.dialog.id).set(action.dialog)
            .then(() => console.log('Dialog is saved to Firestore!'))
            .catch(err => console.log('Error', err.message))
        })
      ), {dispatch: false}
  )

  loadDialogs$ = createEffect(() =>
    this.actions$
      .pipe(
        ofType(DialogsActions.loadAllDialogs),
        concatMap(action => this.chatService.findAllDialogs()),
        map(dialogs => allDialogsLoaded({dialogs: dialogs}))
      )
  )

  addMessageToDialog$ = createEffect(() =>
    this.actions$
      .pipe(
        ofType(DialogsActions.addMessageToDialog),
        tap(action => {
          this.afs.collection('dialogs').doc(action.dialogId).update({
            messages: FieldValue.arrayUnion(action.message)
          })
            .then(() => console.log('Message added to existing dialog in Firestore!'))
            .catch(err => console.log('Error', err.message))
        })
      ),{dispatch: false}
  )

  loadDialogById$ = createEffect(() =>
    this.actions$
      .pipe(
        ofType(DialogsActions.loadDialogById),
        concatMap(action => this.chatService.findDialogById(action.dialogId)),
        map(dialog => dialogByIdLoaded({dialog: dialog}))
      )
  )

  constructor(private actions$: Actions,
              private afs: AngularFirestore,
              private chatService: ChatService) {}
}
