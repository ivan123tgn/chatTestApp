import { Component, OnInit } from '@angular/core';
import {AngularFireStorage} from "@angular/fire/storage";
import {MatDialog} from "@angular/material/dialog";
import {finalize} from "rxjs/operators";
import {Observable} from "rxjs";
import {userId} from "../../../auth/auth-selectors";
import {Store} from "@ngrx/store";
import {AuthState} from "../../../auth/reducers";
import {addProfileImage} from "../../../auth/auth.actions";

@Component({
  selector: 'add-image-dialog',
  templateUrl: './add-image-dialog.component.html',
  styleUrls: ['./add-image-dialog.component.css']
})
export class AddImageDialogComponent implements OnInit {

  fileName: string  = localStorage.getItem('userId') || 'unknown';
  file: any;
  filePath = `ProfileImages/${this.fileName}`;

  downloadURL: Observable<string>;

  constructor(private storage: AngularFireStorage,
              private store: Store<AuthState>,
              public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  onFileSelected(event: any) {
    this.file = event.target.files[0];
  }

  downloadAvatar() {
    const fileRef = this.storage.ref(this.filePath);
    const task = this.storage.upload(this.filePath, this.file);
    task
      .snapshotChanges()
      .pipe(
        finalize(() => {
          this.downloadURL = fileRef.getDownloadURL();
          this.downloadURL.subscribe(url => {
            if (url) {
              this.store.dispatch(addProfileImage({userId: this.fileName, avatarUrl: url}));
              this.dialog.closeAll();
            }
          });
        })
      )
      .subscribe();
  }

  closeDialog() {
    this.dialog.closeAll();
  }

}
